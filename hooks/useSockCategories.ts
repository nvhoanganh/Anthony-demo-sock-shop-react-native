import { useEffect, useState } from 'react';
import { getSocksCatalog } from '../apis/api';

export function useSockCategories() {
	const [isLoadingComplete, setLoadingComplete] = useState(false);
	const [categories, setCategories] = useState([]);

	// Load any resources or data that we need prior to rendering the app
	useEffect(async () => {
		const data = await getSocksCatalog();
		setCategories(data);
		setLoadingComplete(true);
	}, []);

	return { isLoadingComplete, categories };
}
