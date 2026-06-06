import { View, ActivityIndicator } from "react-native";
import useStyles from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/colors";

export default function PageLoader() {
  const styles = useStyles();
  return (
    <View style={styles.loadingContainer}>
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}
