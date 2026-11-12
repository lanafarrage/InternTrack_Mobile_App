import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, Text, View } from "react-native";
import ApplicationCard from "../../components/ApplicationCard";
import EmptyState from "../../components/EmptyState";
import FilterChips from "../../components/FilterChips";
import PrimaryButton from "../../components/PrimaryButton";
import SearchBar from "../../components/SearchBar";
import { COLORS, SPACING } from "../../constants/theme";
import { useApplications } from "../../context/ApplicationsContext";
import { APPLICATION_STATUSES, ApplicationStatus } from "../../types/application";

type StatusFilter = ApplicationStatus | "All";
const FILTER_OPTIONS: readonly StatusFilter[] = ["All", ...APPLICATION_STATUSES];

export default function Applications() {
  const router = useRouter();
  const { applications, isLoading, error, clearError } = useApplications();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All");

  // Search and filter are derived from the full list, so the list stays the single source of truth.
  const query = search.trim().toLowerCase();
  const visibleApplications = applications.filter((app) => {
    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    const matchesSearch =
      query === "" ||
      app.company.toLowerCase().includes(query) ||
      app.position.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {error ? (
        <Text style={styles.error} onPress={clearError}>
          {error} (tap to dismiss)
        </Text>
      ) : null}

      <SearchBar
        value={search}
        onChangeText={setSearch}
        placeholder="Search by company or position"
      />
      <FilterChips options={FILTER_OPTIONS} selected={statusFilter} onSelect={setStatusFilter} />

      <FlatList
        data={visibleApplications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ApplicationCard
            application={item}
            onPress={() =>
              router.push({ pathname: "/application/[id]", params: { id: item.id } })
            }
          />
        )}
        ListEmptyComponent={
          applications.length === 0 ? (
            <EmptyState
              title="No applications yet"
              message="Add your first internship application to start tracking."
              actionLabel="Add application"
              onAction={() => router.push("/application/form")}
            />
          ) : (
            <EmptyState
              title="No results"
              message="No applications match your search or filter."
            />
          )
        }
        contentContainerStyle={{ paddingBottom: SPACING.md }}
      />

      <PrimaryButton title="+ Add application" onPress={() => router.push("/application/form")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, padding: SPACING.md },
  center: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: COLORS.background },
  error: {
    backgroundColor: "#fee2e2",
    color: COLORS.danger,
    padding: SPACING.sm,
    borderRadius: 8,
    marginBottom: SPACING.sm,
    textAlign: "center",
  },
});