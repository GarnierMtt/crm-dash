<script lang="ts">
    import type { Attachment } from 'svelte/attachments';
    import { on } from 'svelte/events';


    import { login } from './shared.svelte.js';


    const trapFocus: Attachment = (node) => {
        const previous = document.activeElement;

        function focusable() {
            return Array.from(node.querySelectorAll('button, input'));
        }
        
        function handleKeydown(event) {
            if (event.key !== 'Tab') return;

            const current = document.activeElement;

            const elements = focusable();
            const first = elements.at(0);
            const last = elements.at(-1);

            if (event.shiftKey && current === first) {
                last.focus();
                event.preventDefault();
            }

            if (!event.shiftKey && current === last) {
                first.focus();
                event.preventDefault();
            }
        }

        focusable()[0]?.focus();
        const off = on(node, 'keydown', handleKeydown);

        return () => {
            off();
            previous?.focus();
        };
    }
</script>

<button onclick={() => { login.show = true}}>test</button>
{#if login.show}
    <login class="loginFrame">
        <div class="loginBox" {@attach trapFocus}>
            <form id="loginForm" method="post">
                <label for="username">Mél</label>
                <input 
                    type="email" 
                    name="_username" 
                    id="username"
                    autocomplete="email"
                    required
                />
                <label for="password">Mot de passe</label>
                <input
                    type="password"
                    name="_password"
                    id="password"
                    autocomplete="current-password"
                    required
                />
                <input
                    type="hidden"
                    name="_csrf_token"
                    data-controller="csrf-protection"
                    value="csrf-token"
                />
                <button type="submit">Connecter</button>
            </form>
            <button onclick={() => {login.show = false;}}>hide</button>
        </div>
        <script>
            
            const loginForm = document.getElementById("loginForm");
            loginForm.addEventListener("submit", function(e) {
                e.preventDefault();
                const formData = new URLSearchParams(new FormData(this));
                console.log(formData);
                //*
                fetch ("http://192.168.11.2/login", {
                    method: "POST",
                    credentials: "include",
                    redirect: "follow",
                    body: formData,
                })
                .then((response) => response.text())
                .then((result) => console.log(result))
                .catch((error) => console.error(error));//*/
            });
        </script>
    </login>
{/if}



<style>
    .loginFrame {
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(20px);
	}

    .loginBox {
		position: relative;
		background: var(--objColor);
		width: calc(100% - 2em);
		max-width: 28em;
		padding: 1em 1em 0.5em 1em;
		border-radius: 1em;
		box-sizing: border-box;
		user-select: none;
	}

    .loginBox > form {
        display: flex;
        flex-direction: column;
    }
</style>