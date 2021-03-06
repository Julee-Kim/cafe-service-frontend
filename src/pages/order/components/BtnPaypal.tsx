import { PayPalButton } from "react-paypal-button-v2";

interface IPaypalProps {
  total: number;
  transactionSuccess: Function;
  transactionError: Function;
}

export const BtnPaypal: React.FC<IPaypalProps> = ({
  transactionSuccess,
  transactionError,
}) => {
  return (
    <PayPalButton
      options={{
        clientId: "ASzukfVrJGHz2CGiij_GBMsPqhfNcoA_5Q4Gz_RhO8YL00vgvBZhS32nh_KSvCU53RjnPvMvggFRJDXs"
      }}

      amount={1}

      onSuccess={(details: object, data: object) => {
        transactionSuccess(data);
      }}

      catchError={(err: any) => {
        transactionError();
      }}
    />
  )
}
