import {
	StyleSheet,
	Button,
	SafeAreaView,
	ScrollView,
	Alert,
} from 'react-native';
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
	const addToCart = (x) => {
		console.log(`Adding item to cart: ${x.description}`);

		const remaining = x.count - 1;
		if (remaining === 0) {
			throw new Error(`There will be 0 left if you purchase this item`);
		}
		Alert.alert(
			`${x.name}\n\n${x.description} \n\nItems Remaining: ${x.count}`
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<View style={styles.container}>
					{isLoadingComplete ? (
						<View>
							<Text style={styles.title}>
								Weave Shop Front end
							</Text>
							{categories.map((x, index) => (
								<View
									key={`${x.id}`}
									style={{
										margin: 20,
										textAlign: 'left',
									}}
								>
									<Text style={styles.subtitle}>
										{x.name} - ${x.price}
									</Text>
									<Text style={styles.subtitle2}>
										{x.description}
									</Text>
									<Text style={styles.subtitle2}>
										{x.count} in stock
									</Text>
									<View style={styles.imgContainer}>
										<Image
											style={styles.img}
											source={{
												uri: `${API_ENDPOINT}${x.imageUrl[0]}`,
											}}
										></Image>
									</View>
									<View style={styles.container}>
										<Button
											title='Add to Cart'
											backgroundColor='blue'
											onPress={() => addToCart(x)}
										/>
									</View>
								</View>
							))}
						</View>
					) : (
						<View style={styles.container}>
							<Text>Loading Categories..</Text>
						</View>
					)}

					<View
						style={styles.separator}
						lightColor='#eee'
						darkColor='rgba(255,255,255,0.1)'
					/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginHorizontal: 10,
		marginVertical: 10,
	},
	title: {
		margin: 20,
		fontSize: 20,
		fontWeight: 'bold',
		marginBottom: 30,
	},
	subtitle: {
		fontSize: 19,
		marginVertical: 20,
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
		width: 300,
		height: 300,
	},
	imgContainer: {
		marginTop: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
