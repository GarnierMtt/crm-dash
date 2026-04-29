<script lang="ts">
    import { global } from './global.svelte.js';
    import type { Attachment } from 'svelte/attachments';
    import { on } from 'svelte/events';



    const loginSubmit: Attachment = (loginForm) => {
        on(loginForm, "submit", function(e) {
            e.preventDefault();
            const formData = new FormData(loginForm as HTMLFormElement);
            
            fetch (global.backendURL + "/login", {
                method: "POST",
                credentials: "include",
                redirect: "follow",
                body: formData,
            })
            .then((response) => response.text())
            .then((result) => {
                if(result != "\"unauthenticated\""){
                    window.location.reload()
                }
            });
        })
    }
    
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


{#if global.login}
    <login class="loginFrame">
        <div class="obj loginBox" {@attach trapFocus}>
            <form method="post" {@attach loginSubmit}>
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
                <button type="submit" class="btn">Connecter</button>
            </form>
        </div>
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
		backdrop-filter: blur(.5em);
	}

    .loginBox {
		position: relative;
		background: var(--objColor);
		width: calc(100% - 2em);
		max-width: 28em;
		box-sizing: border-box;
		user-select: none;
	}

    .loginBox > form {
        display: flex;
        flex-direction: column;
    }
</style>