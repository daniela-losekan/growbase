import { authRoles } from 'app/auth';
import React from 'react';

const MessageConfig = {
	settings: {
		layout: {
			config: {
				mode: 'fullwidth',
				scroll: 'content',
				navbar: {
					display: true,
					folded: false,
					position: 'left'
				},
				toolbar: {
					display: true,
					style: 'fixed',
					position: 'below'
				},
				footer: {
					display: false,
					style: 'fixed',
					position: 'below'
				}
			}
		}
	},
	// auth: authRoles.admin,
	routes: [
		{
			path: '/message/:id',
			component: React.lazy(() => import('./show/Message'))
		},
		{
			path: '/message',
			exact: true,
			component: React.lazy(() => import('./list/Message'))
		}
	]
};

export default MessageConfig;
