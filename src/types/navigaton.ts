import { RouteProp } from '@react-navigation/native';

export type RootStackParamList = {
  OverviewScreen: { headerShown: boolean };
  DetailsScreen: { lat: string; lon: string };
};

type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'DetailsScreen'>;

export interface DetailsScreenProps {
  route: DetailsScreenRouteProp;
}
