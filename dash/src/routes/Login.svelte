<script lang="ts">
    import { showLogin } from './global.svelte.ts';
    import { request } from './global.svelte.ts';
    import type { Attachment } from 'svelte/attachments';
    import { on } from 'svelte/events';


    //prevent default and handle login form subit
    function onsubmit(e: Event) {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        
        request.new("/login", formData);
    }
    
    //stop focus from drifting outside the login box
    const trapFocus: Attachment = (loginBox) => {

        function focusable() {
            return Array.from(loginBox.querySelectorAll('button, input')) as HTMLElement[];
        }


        focusable()[0]?.focus();
        
        on(loginBox, 'keydown', function(event){
            const e = event as KeyboardEvent;
            if(e.key !== 'Tab') return;

            const current = document.activeElement;

            const elements = focusable();
            const first = elements.at(0);
            const last = elements.at(-1);

            if(e.shiftKey && current === first) {
                last?.focus();
                e.preventDefault();
            }else if(!e.shiftKey && current === last) {
                first?.focus();
                e.preventDefault();
            }
        });
    }
    
</script>


{#if showLogin}
    <login class="loginFrame">
        <div class="obj loginBox" {@attach trapFocus}>
            <form method="post" {onsubmit}>
                <label for="username">Mél :</label>
                <input 
                    type="email" 
                    name="_username" 
                    id="username"
                    autocomplete="email"
                    required
                />
                <br>
                <label for="password">Mot de passe :</label>
                <input
                    type="password"
                    name="_password"
                    id="password"
                    autocomplete="current-password"
                    required
                />
                <br>
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

    button {
        width: min-content;
        align-self: end;
    }

    label {
        font-weight: bold;
    }
</style>