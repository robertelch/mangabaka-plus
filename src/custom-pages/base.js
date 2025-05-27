import { createIcons, icons } from 'lucide';

export default class BasePage {

    static SIDEBAR_ICON = "triangle-alert"
    static SIDEBAR_NAME = "ERROR"
    static PAGE_LINK = "error312"

    
    static get CHECK_EX() {
        return new RegExp(`https://mangabaka\\.dev/${this.PAGE_LINK}`, "i");
    }

    static insertSidebar(sidebar) {
        let confirm = sidebar.querySelector(`#${this.PAGE_LINK}`);
        if (!confirm) {
            const li = document.createElement('li');
            li.setAttribute('data-sidebar', 'menu-sub-item');

            const a = document.createElement('a');
            a.id = this.PAGE_LINK;
            a.href = `https://mangabaka.dev/${this.PAGE_LINK}`;
            a.className = `text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0 data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground text-sm group-data-[collapsible=icon]:hidden`;
            a.setAttribute('onclick', "event.preventDefault(); history.pushState(null, '', this.href);");
            a.setAttribute('data-sidebar', 'menu-sub-button');
            a.setAttribute('data-size', 'md');
            a.setAttribute('data-active', 'false');

            const icon = document.createElement('i');
            icon.setAttribute('data-lucide', this.SIDEBAR_ICON);

            a.appendChild(icon);
            a.append(this.SIDEBAR_NAME); // Assumes this.SIDEBAR_NAME is a string. If it's HTML, use `innerHTML` carefully or `innerText`.

            li.appendChild(a);
            sidebar.appendChild(li);

            createIcons({ icons });

        }
    }
    static getPage() {
        return `<div id="customInsert" class="px-2 py-4 sm:px-4">ERROR</div>`
    }


    static async prepStuff(contentWrapper) {
        console.log("No Stuff to Prep")
        }
    }

