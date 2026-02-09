import JoinUs from "./JoinUs";

type JoinUsSectionProps = {
  referral?: string;
};

export default function JoinUsSection({ referral }: JoinUsSectionProps) {
  return <JoinUs referral={referral} />;
}
