import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import Error from "./Error.jsx";

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

				navigator.geolocation.getCurrentPosition((pos) => {
					setAvailablePlaces(resData.places);
				});
			} catch (error) {
				setError({ message: error.message || "could not fetch places" });
			}
			setIsFetching(false);
		}
		fetchPlaces();
	}, []);

	if (error) {
		return (
			<Error
				title="An error occurred!"
				message={error.message}
			/>
		);
	}
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
