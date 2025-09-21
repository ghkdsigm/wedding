import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import HomeIndex from '../pages/home/index.vue'
import Announcement from '../pages/announcement/index.vue'
import Invitatation from '../pages/invitation/index.vue'
import ShareIndex from '../pages/share/guest.vue'
import Wedding from '../pages/Wedding.vue'
import Location from '../pages/Location.vue'
import RSVP from '../pages/RSVP.vue'
import Message from '../pages/Message.vue'
import Contact from '../pages/Contact.vue'

const routes = [
	{ path: '/', component: Home },
	{ path: '/home', component: HomeIndex },
	{ path: '/share', component: ShareIndex },
	{ path: '/invitation', component: Invitatation },
	{ path: '/announcement', component: Announcement },
	{ path: '/wedding', component: Wedding },
	{ path: '/location', component: Location },
	{ path: '/rsvp', component: RSVP },
	{ path: '/message', component: Message },
	{ path: '/contact', component: Contact },
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
