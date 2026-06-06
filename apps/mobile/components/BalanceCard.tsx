import { View, Text } from "react-native";
import useStyles from "@/assets/styles/home.styles";
import { COLORS } from "@/constants/colors";

type BalanceCardProps = {
  balance?: number | string | null;
  income?: number | string | null;
  expenses?: number | string | null;
};

export default function BalanceCard({
  balance,
  income,
  expenses,
}: BalanceCardProps) {
  const styles = useStyles();

  // Safely convert everything to numbers
  const safeBalance = Number(balance ?? 0);
  const safeIncome = Number(income ?? 0);
  const safeExpenses = Number(expenses ?? 0);

  return (
    <View style={styles.balanceCard}>
      <Text style={styles.balanceTitle}>Total Balance</Text>

      <Text style={styles.balanceAmount}>
        ${safeBalance.toFixed(2)}
      </Text>

      <View style={styles.balanceStats}>
        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Income</Text>
          <Text
            style={[
              styles.balanceStatAmount,
              { color: COLORS.income },
            ]}
          >
            +${safeIncome.toFixed(2)}
          </Text>
        </View>

        <View style={[styles.balanceStatItem, styles.statDivider]} />

        <View style={styles.balanceStatItem}>
          <Text style={styles.balanceStatLabel}>Expenses</Text>
          <Text
            style={[
              styles.balanceStatAmount,
              { color: COLORS.expense },
            ]}
          >
            -${Math.abs(safeExpenses).toFixed(2)}
          </Text>
        </View>
      </View>
    </View>
  );
}