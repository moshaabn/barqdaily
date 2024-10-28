"use client";

import { m } from "framer-motion";
import { useTranslations } from "next-intl";

import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import { alpha } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

import { paths } from "@/routes/paths";
import { useRouter } from "@/routes/hooks";
import { RouterLink } from "@/routes/components";

import { useAuthContext } from "@/auth/hooks";

import { varHover } from "@/components/animate";
import { useSnackbar } from "@/components/snackbar";
import CustomPopover, { usePopover } from "@/components/custom-popover";

// ----------------------------------------------------------------------

const OPTIONS = [
  {
    label: "home",
    linkTo: paths.home,
  },
  {
    label: "orders",
    linkTo: paths.orders,
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const t = useTranslations();
  const { authenticated } = useAuthContext();

  if (authenticated) return <AccountPopoverContent />;

  return (
    <Button
      variant="outlined"
      LinkComponent={RouterLink}
      href={paths.auth.jwt.login}
      sx={{ flexShrink: 0 }}
    >
      {t("Global.Label.login")}
    </Button>
  );
}

function AccountPopoverContent() {
  const t = useTranslations("Navigation");

  const router = useRouter();

  const { user, logout } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Unable to logout!", { variant: "error" });
    }
  };

  const handleClickItem = (path: string) => {
    popover.onClose();
    router.push(path);
  };

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(popover.open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={user?.avatar}
          alt={user?.name}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
          }}
        >
          {user?.name?.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        sx={{ width: 200, p: 0 }}
      >
        <Box sx={{ p: 2, pb: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user?.name}
          </Typography>

          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.phone}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Stack sx={{ p: 1 }}>
          {OPTIONS.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => handleClickItem(option.linkTo)}
            >
              {t(option.label)}
            </MenuItem>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <MenuItem
          onClick={handleLogout}
          sx={{ m: 1, fontWeight: "fontWeightBold", color: "error.main" }}
        >
          {t("logout")}
        </MenuItem>
      </CustomPopover>
    </>
  );
}
