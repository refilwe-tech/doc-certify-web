import { map } from "lodash";

export const adminStatModel = (stat) => ({
  title: `Active ${stat?.name}s` ?? "",
  value: `${stat?.user_count ?? ""}`,
  description: stat?.name ?? "",
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
