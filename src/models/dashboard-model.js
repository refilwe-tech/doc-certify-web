import { map } from "lodash";

export const adminStatModel = (stat) => ({
  title: `Active ${stat?.name}s` ?? "",
  value: `${stat?.user_count ?? ""}`,
  description: stat?.name ?? "",
});

export const adminStatsModel = (data) => ({
  admin: map(data?.stats, (stat) => adminStatModel(stat)),
});
