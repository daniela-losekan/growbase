import React, { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import PageCardedHeader from 'app/fuse-layouts/shared-components/page-carded-header/PageCardedHeader';

function Header() {
	const messageRedux = useSelector(({ message }) => message);
	const [message, setMessage] = useState({});

	useEffect(() => {
		if (messageRedux) {
			setMessage(messageRedux);
		}
	}, [messageRedux]);

	return <PageCardedHeader link="/recado" title={message?.titulo || 'New message'} textBack="Messages" />;
}

export default Header;
