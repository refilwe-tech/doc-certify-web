import { userStore } from "../../../reducers";
import { StatCard, CertificationCard } from "../../common";
import { DashboardService } from "../../../services";
import { ClipLoader } from "react-spinners";
import { Widget } from "../../widgets";
import { useQuery } from "@tanstack/react-query";

export const HomePage = () => {
  const { user } = userStore();
  const { firstName, email, registrationDate } = user;

  const certifications = [
    {
      title: "Identification Documents",
      description:
        "Certifying copies of passports, national identity cards, driver's licenses, etc.",
    },
    {
      title: "Academic Certificates",
      description: "Certifying copies of degrees, diplomas, transcripts, etc.",
    },
    {
      title: "Legal Documents",
      description:
        "Certifying copies of contracts, affidavits, agreements, etc.",
    },
    {
      title: "Financial Documents",
      description:
        "Certifying copies of financial statements, bank documents, etc.",
    },
    {
      title: "Medical Documents",
      description: "Certifying copies of medical reports, prescriptions, etc.",
    },
    {
      title: "Property Documents",
      description: "Certifying copies of property deeds, titles, etc.",
    },
    {
      title: "Business Documents",
      description:
        "Certifying copies of certificates of incorporation, partnership agreements, etc.",
    },
    {
      title: "Official Government Documents",
      description:
        "Certifying copies of birth certificates, marriage certificates, land titles, etc.",
    },
  ];
  const { data: userData, isLoading: userIsLoading } = useQuery({
    queryKey: ["getCerifyeeStats"],
    queryFn: () => DashboardService.getCertifyeeStats(user?.userID),
    enabled: user.role === "Certifyee",
  });

  const { data: adminData, isLoading: adminLoading } = useQuery({
    queryKey: ["getAdminStats"],
    queryFn: () => DashboardService.getAdminsStats(),
    enabled: user.role === "Admin" || user.role === "Sudo",
  });

  const { data: certifierData, isLoading: certifierLoading } = useQuery({
    queryKey: ["getCertifierStats"],
    queryFn: () => DashboardService.getCertifierStats(user?.userID),
    enabled: user.role === "Certifier",
  });

  return (
    <section className="w-full">
      <h1 className="text-xl font-semibold">
        Hello, {(firstName || email) ?? ""} 👋
      </h1>
      <h1 className="text-sm font-semibold py-2">
        You joined us{" "}
        <span className="text-green-500">{registrationDate ?? ""}</span>. We are
        glad to have you here. Here&apos;s a summary of your activities.
      </h1>
      <section className="grid w-full grid-cols-1 lg:grid-cols-3 gap-4 py-4">
        {user.role === "Certifyee" &&
          (userData?.certifyee ?? [])?.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        {user.role === "Admin" ||
          (user.role === "Sudo" &&
            adminData?.admin?.map((stat, index) => (
              <StatCard key={index} {...stat} />
            )))}

        {user.role === "Certifier" &&
          (certifierData?.certifier ?? [])?.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}

        {(userIsLoading || adminLoading || certifierLoading) && (
          <section className="flex justify-center gap-2">
            <ClipLoader className=" text-primary" /> Loading...
          </section>
        )}
      </section>

      {user.role === "Certifyee" && (
        <Widget>
          <>
            <h1 className="text-xl font-semibold py-2">
              You can do the following types of certifications
            </h1>
            <section className="grid grid-cols-1 gap-4 lg:grid-cols-4">
              {certifications.map((certification, index) => (
                <CertificationCard
                  color={index % 2 === 0 ? "bg-primary" : "bg-secondary"}
                  key={index}
                  title={certification.title}
                  description={certification.description}
                />
              ))}
            </section>
          </>
        </Widget>
      )}
    </section>
  );
};
