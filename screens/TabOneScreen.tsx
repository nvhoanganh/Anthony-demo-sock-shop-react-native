import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View, Image } from '../components/Themed';
import { useSockCategories } from '../hooks/useSockCategories';
import { RootTabScreenProps } from '../types';
import { API_ENDPOINT } from '../apis/api';
import { useEffect, useState } from 'react';

export default function TabOneScreen({
	navigation,
}: RootTabScreenProps<'TabOne'>) {
	const { isLoadingComplete, categories } = useSockCategories();

	return (
		<View style={styles.container}>
			{isLoadingComplete ? (
				<View>
					<Text style={styles.title}>Weave Shop Front end</Text>
					{categories.map((x, index) => (
						<View
							key={`${x.id}`}
							style={{
								margin: 20,
								textAlign: 'left',
							}}
						>
							<Text style={styles.subtitle}>{x.name}</Text>
							<Text key={x.id} style={styles.subtitle2}>
								{x.description}
							</Text>
							<View style={styles.imgContainer}>
								<Image
									style={styles.img}
									source={{
										uri: `${API_ENDPOINT}${x.imageUrl[0]}`,
									}}
								></Image>
							</View>
						</View>
					))}
				</View>
			) : (
				<Text>Loading Categories..</Text>
			)}

			<View
				style={styles.separator}
				lightColor='#eee'
				darkColor='rgba(255,255,255,0.1)'
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	title: {
		margin: 20,
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 30,
	},
	subtitle: {
		fontSize: 19,
	},
	subtitle2: {
		fontSize: 12,
		fontWeight: 'bold',
		marginBottom: 30,
	},
	subtitle3: {
		fontSize: 11,
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: '80%',
	},
	img: {
		width: 150,
		height: 150,
	},
	imgContainer: {
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
