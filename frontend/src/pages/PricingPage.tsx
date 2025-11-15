import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  CardHeader,
  Button,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ToggleButton,
  ToggleButtonGroup,
  Divider,
  Stack,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FAQ from "../components/FAQ";
import CallToAction from "../components/CallToAction";
import Footer from "../components/Footer";

type Billing = "monthly" | "yearly";

type Tier = {
  id: string;
  name: string;
  description: string;
  priceMonthly: number;
  priceYearly: number;
  cta: string;
  href: string;
  features: string[];
  highlighted?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    description: "For personal projects and trying things out.",
    priceMonthly: 0,
    priceYearly: 0,
    cta: "Get Started",
    href: "/signup",
    features: ["1 site", "Basic analytics", "Community support", "Free SSL"],
  },
  {
    id: "pro",
    name: "Pro",
    description: "For growing products that need performance and support.",
    priceMonthly: 29,
    priceYearly: 24,
    cta: "Start Pro",
    href: "/signup",
    features: [
      "Unlimited sites",
      "Advanced analytics",
      "CI/CD pipelines",
      "Email support",
      "Daily backups",
    ],
    highlighted: true,
  },
  {
    id: "business",
    name: "Business",
    description: "For teams that need scale, SLAs and custom work.",
    priceMonthly: 99,
    priceYearly: 79,
    cta: "Contact Sales",
    href: "/about",
    features: [
      "Priority support",
      "SLA & SSO",
      "Custom integrations",
      "Dedicated environment",
      "Role-based access",
    ],
  },
];

const formatPrice = (amount: number) => (amount === 0 ? "Free" : `$${amount}`);

const PricingPage = () => {
  const [billing, setBilling] = useState<Billing>("monthly");

  const handleBilling = (_: unknown, value: Billing | null) => {
    if (value) setBilling(value);
  };

  return (
    <Box
      sx={{
        bgcolor: "background.default",
        color: "text.primary",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
        <Container maxWidth="lg">
          <Typography
            variant="overline"
            sx={{ color: "primary.main", mb: 2, fontSize: 18 }}
          >
            PRICING
          </Typography>
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2 }}>
            Simple, transparent pricing
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 900 }}
          >
            Choose a plan that grows with you. Upgrade, downgrade, or cancel
            anytime.
          </Typography>

          {/* Billing toggle */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 4 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Billing:
            </Typography>
            <ToggleButtonGroup
              exclusive
              value={billing}
              onChange={handleBilling}
              size="small"
              color="primary"
            >
              <ToggleButton value="monthly">Monthly</ToggleButton>
              <ToggleButton value="yearly">Yearly · Save 20%</ToggleButton>
            </ToggleButtonGroup>
          </Stack>
        </Container>
      </Box>

      {/* Plans */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <Grid container spacing={3}>
          {TIERS.map((tier) => {
            const isYearly = billing === "yearly";
            const price = isYearly ? tier.priceYearly : tier.priceMonthly;
            const subLabel =
              tier.priceMonthly === 0
                ? ""
                : isYearly
                ? "per month, billed yearly"
                : "per month";
            return (
              <Grid key={tier.id} size={{ xs: 12, md: 4 }}>
                <Card
                  elevation={tier.highlighted ? 6 : 2}
                  sx={{
                    height: "100%",
                    borderRadius: 2,
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {tier.highlighted && (
                    <Chip
                      label="Most Popular"
                      color="primary"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        fontWeight: 700,
                      }}
                    />
                  )}
                  <CardHeader
                    title={tier.name}
                    subheader={tier.description}
                    sx={{ "& .MuiCardHeader-title": { fontWeight: 800 } }}
                  />
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 1,
                        mb: 2,
                      }}
                    >
                      <Typography variant="h3" sx={{ fontWeight: 900 }}>
                        {formatPrice(price)}
                      </Typography>
                      {subLabel && (
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {subLabel}
                        </Typography>
                      )}
                    </Box>

                    <Button
                      fullWidth
                      variant={tier.highlighted ? "contained" : "outlined"}
                      color={tier.highlighted ? "primary" : "inherit"}
                      href={tier.href}
                      endIcon={<ArrowForwardIcon />}
                      sx={{ mb: 2 }}
                    >
                      {tier.cta}
                    </Button>

                    <Divider sx={{ my: 2 }} />
                    <List dense>
                      {tier.features.map((f) => (
                        <ListItem key={f} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 36 }}>
                            <CheckCircleIcon color="primary" fontSize="small" />
                          </ListItemIcon>
                          <ListItemText
                            primaryTypographyProps={{ variant: "body2" }}
                            primary={f}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>

      {/* FAQ */}
      <Container maxWidth="lg">
        <FAQ />
      </Container>

      {/* CTA */}
      <Container maxWidth="lg">
        <CallToAction />
      </Container>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default PricingPage;
