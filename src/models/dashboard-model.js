import { map } from "lodash";

export const adminStatModel = (stat) => ({
  title: `Total ${stat?.name}s` ?? "",
  value: `${stat?.user_count ?? ""}`,
  description: `${stat?.name}${stat?.user_count > 1 ? "s" : ""}` ?? "",
});

export const adminStatsModel = (data) => ({
  admin: map(data?.stats, (stat) => adminStatModel(stat)),
});

export const certifyeeStatModel = (stat) => ({
  title: stat?.name ?? "",
  value: `${stat?.doc_count}` ?? "",
  description: stat?.description ?? "",
});

export const certifyeeStatsModel = (data) => ({
  certifyee: map(data?.stats, (stat) => certifyeeStatModel(stat)),
});

export const certifierStatsModel = (data) => ({
  certifier: map(data?.stats, (stat) => certifyeeStatModel(stat)),
});
