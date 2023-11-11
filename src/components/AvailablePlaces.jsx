import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
	const [AvailablePlaces, setAvailablePlaces] = useState([]);
	const [isFetching, setIsFetching] = useState(false);
	const [error, setError] = useState();

	useEffect(() => {
		async function fetchPlaces() {
			setIsFetching(true);
			try {
				const response = await fetch("http://localhost:3000");
				if (!response.ok) {
					throw new Error(`Failed to fetch places`);
				}
				const resData = await response.json();
				setAvailablePlaces(resData.places);
			} catch (error) {
				setError(error);
			}
			setIsFetching(false);
		}
		fetchPlaces();
	}, []);

	return (
		<Places
			title="Available Places"
			places={AvailablePlaces}
			isLoading={isFetching}
			loadingText="Fetching places data..."
			fallbackText="No places available."
			onSelectPlace={onSelectPlace}
		/>
	);
}
