"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";

import { Box, Step, Stack, Stepper, StepLabel, Container } from "@mui/material";

import { usecheckoutStore } from "@/contexts/checkout-store";

import CartStep from "../cart-step";
import { steps } from "../config-cart";
import PaymentStep from "../payment-step";
import OrderSumamry from "../order-summary";
import TimeLocationStep from "../time-location-step";

export default function Cart() {
  const t = useTranslations("Pages.Cart");

  const { step, setStep } = usecheckoutStore();

  useEffect(() => {
    setStep(0);
  }, [setStep]);

  const renderHeadding = (
    <Stack py={5} bgcolor="background.neutral">
      <Container>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{t(`Steps.${label}`)}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Container>
    </Stack>
  );

  const stepsElements = [<CartStep />, <TimeLocationStep />, <PaymentStep />];

  return (
    <>
      {renderHeadding}
      <Container sx={{ py: 3 }}>
        <Stack gap={3} direction={{ md: "row" }}>
          <Box flexGrow={1}>{stepsElements[step]}</Box>
          <Box flexShrink={0} width={{ md: "380px" }}>
            <OrderSumamry />
          </Box>
        </Stack>
      </Container>
    </>
  );
}
