"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Camera, ChevronDown } from "lucide-react";
import { AppHeader } from "@/components/layout/AppHeader";
import { SidebarNav } from "@/components/layout/SidebarNav";
import {
  useDeleteAccount,
  useMe,
  useUpdateMe,
  useUploadAvatar,
} from "@/hooks/queries/useUser";
import { useLogout } from "@/hooks/queries/useAuth";
import { ApiError } from "@/lib/api/errors";

type ProfilePanel = "account" | "settings";

interface ProfileSetting {
  id: string;
  label: string;
  enabled: boolean;
}

const profileSettings: ProfileSetting[] = [
  { id: "s1", label: "Schngs #1", enabled: true },
  { id: "s2", label: "Schngs #2", enabled: false },
  { id: "s3", label: "Schngs #3", enabled: false },
  { id: "s4", label: "Schngs #4", enabled: true },
];

function SectionNav({
  activePanel,
  onPanelChange,
  onLogout,
}: {
  activePanel: ProfilePanel;
  onPanelChange: (panel: ProfilePanel) => void;
  onLogout: () => void;
}) {
  return (
    <aside className="w-[294px] shrink-0 rounded-[16px] border border-white bg-[#FDFDFD] p-3 shadow-[0px_32px_64px_rgba(0,0,0,0.08),0px_4px_24px_rgba(8,8,8,0.04),0px_2px_4px_rgba(8,8,8,0.05)]">
      <h3 className="mb-3 text-xl font-bold leading-6 text-[#0F172A]">
        Profil
      </h3>
      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={() => onPanelChange("account")}
          className={`flex h-12 items-center rounded-[10px] px-3 text-left text-lg font-semibold leading-5 transition ${
            activePanel === "account"
              ? "bg-[#E9F2FF] text-[#1E78FE]"
              : "text-[#0F172A]"
          }`}
        >
          Account
        </button>
        <button
          type="button"
          onClick={() => onPanelChange("settings")}
          className={`flex h-9 items-center rounded-[10px] px-3 text-left text-lg font-semibold leading-5 transition ${
            activePanel === "settings"
              ? "bg-[#E9F2FF] text-[#1E78FE]"
              : "text-[#0F172A]"
          }`}
        >
          Settings
        </button>
        <button
          type="button"
          onClick={onLogout}
          className="flex h-9 items-center rounded-[10px] px-3 text-left text-lg font-semibold leading-5 text-[#FF5C35] transition hover:bg-[#FFF1ED]"
        >
          Log Out
        </button>
      </div>
    </aside>
  );
}

function Toggle({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`relative h-5 w-8 rounded-full transition ${
        enabled ? "bg-[#2D68FF]" : "bg-[#E2E8F0]"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`absolute top-0.5 size-4 rounded-full bg-white shadow-sm transition ${
          enabled ? "left-[14px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

export default function ProfilePage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [activePanel, setActivePanel] = useState<ProfilePanel>("account");
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [settings, setSettings] = useState(profileSettings);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { data: user, isLoading: meLoading } = useMe();
  const updateMe = useUpdateMe(user?.id ?? "");
  const uploadAvatar = useUploadAvatar();
  const deleteAccount = useDeleteAccount();
  const logout = useLogout();

  useEffect(() => {
    if (!user || hydrated) return;
    setFirstName(user.firstName ?? "");
    setLastName(user.lastName ?? "");
    setPhone(user.phone ?? "");
    setHydrated(true);
  }, [user, hydrated]);

  const toggleSetting = (id: string) => {
    setSettings((current) =>
      current.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting,
      ),
    );
  };

  const isDirty =
    !!user &&
    (firstName !== (user.firstName ?? "") ||
      lastName !== (user.lastName ?? "") ||
      phone !== (user.phone ?? ""));

  const handleSave = () => {
    if (!user || !isDirty) return;
    setErrorMessage(null);
    setSuccessMessage(null);
    updateMe.mutate(
      { firstName, lastName, phone },
      {
        onSuccess: () => setSuccessMessage("Saved"),
        onError: (err) => {
          setErrorMessage(
            err instanceof ApiError ? err.message : "Failed to save changes.",
          );
        },
      },
    );
  };

  const handleAvatarPick = () => fileInputRef.current?.click();

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErrorMessage(null);
    uploadAvatar.mutate(file, {
      onError: (err) => {
        setErrorMessage(
          err instanceof ApiError ? err.message : "Failed to upload avatar.",
        );
      },
    });
  };

  const handleDeleteAccount = () => {
    if (!user) return;
    if (typeof window !== "undefined") {
      const ok = window.confirm(
        "Delete your account permanently? This cannot be undone.",
      );
      if (!ok) return;
    }
    deleteAccount.mutate(user.id, {
      onSuccess: () => router.replace("/login"),
      onError: (err) => {
        setErrorMessage(
          err instanceof ApiError ? err.message : "Failed to delete account.",
        );
      },
    });
  };

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSettled: () => {
        setIsLogoutOpen(false);
        router.replace("/login");
      },
    });
  };

  const avatarSrc = user?.avatarUrl || user?.avatar || "/Avatar.svg";
  const displayName = user?.fullName?.trim() || "User";

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-[family-name:var(--font-urbanist)]">
      <AppHeader />

      <div className="mx-auto flex w-full max-w-[1440px] gap-6 px-[60px] pb-12 pt-[122px]">
        <aside className="w-[294px] shrink-0">
          <SidebarNav />
        </aside>

        <main className="flex flex-1 items-start gap-4">
          <section className="w-[612px] shrink-0 rounded-2xl border border-white bg-[#FDFDFD] p-6 shadow-[0px_32px_64px_rgba(0,0,0,0.08),0px_4px_24px_rgba(8,8,8,0.04),0px_2px_4px_rgba(8,8,8,0.05)]">
            {activePanel === "account" ? (
              <div>
                <h2 className="mb-4 text-xl font-bold leading-6 text-[#0F172A]">
                  Account
                </h2>

                <div className="mb-4 relative flex items-center gap-3">
                  <div className="relative size-[72px] overflow-hidden rounded-full bg-[#CBD5E1]">
                    <Image
                      src={avatarSrc}
                      alt={displayName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleAvatarPick}
                    disabled={uploadAvatar.isPending || meLoading}
                    className="inline-flex absolute left-10 bottom-0 size-8 items-center justify-center rounded-full bg-[#FFFFFF] text-[#2D68FF] disabled:opacity-60"
                    aria-label="Change avatar"
                  >
                    {uploadAvatar.isPending ? (
                      <div className="size-4 rounded-full border-2 border-[#2D68FF]/30 border-t-[#2D68FF] animate-spin" />
                    ) : (
                      <Camera size={16} />
                    )}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </div>

                <div className="space-y-3">
                  <label className="block">
                    <span className="mb-1 block text-sm font-medium leading-4 text-[#0F172A]">
                      Firstname
                    </span>
                    <input
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      disabled={meLoading}
                      className="h-12 w-full rounded-2xl border border-[#E2E8F0] bg-white px-3 text-lg outline-none disabled:opacity-60"
                      placeholder="Mark"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium leading-4 text-[#0F172A]">
                      Surname
                    </span>
                    <input
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      disabled={meLoading}
                      className="h-12 w-full rounded-2xl border border-[#E2E8F0] bg-white px-3 text-lg outline-none disabled:opacity-60"
                      placeholder="Zuckerberg"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-1 block text-sm font-medium leading-4 text-[#0F172A]">
                      Phone
                    </span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={meLoading}
                      className="h-12 w-full rounded-2xl border border-[#E2E8F0] bg-white px-3 text-lg outline-none disabled:opacity-60"
                      placeholder="+998 91 123 45 67"
                    />
                  </label>
                </div>

                {errorMessage && (
                  <p className="mt-3 text-sm font-medium leading-5 text-[#DC2626]">
                    {errorMessage}
                  </p>
                )}
                {successMessage && !errorMessage && (
                  <p className="mt-3 text-sm font-medium leading-5 text-[#16A34A]">
                    {successMessage}
                  </p>
                )}

                <div className="mt-4 flex flex-col items-start gap-3">
                  <button
                    type="button"
                    onClick={handleSave}
                    disabled={!isDirty || updateMe.isPending || meLoading}
                    className={`flex h-10 items-center justify-center rounded-[10px] px-8 py-2 text-lg font-semibold transition ${
                      isDirty && !updateMe.isPending
                        ? "bg-gradient-to-b from-[#779DFF] to-[#2D68FF] text-white"
                        : "bg-[#EDF2F7] text-[#CBD5E1]"
                    }`}
                  >
                    {updateMe.isPending ? (
                      <div className="size-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    disabled={deleteAccount.isPending || !user}
                    className="text-lg font-semibold text-[#FF3B30] disabled:opacity-60"
                  >
                    {deleteAccount.isPending
                      ? "Deleting…"
                      : "Delete The Account"}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="mb-4 text-xl font-bold leading-6 text-[#0F172A]">
                  Settings
                </h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between text-[13px] text-[#0F172A]">
                    <span className="font-medium">Tl</span>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-lg font-semibold text-[#0F172A]"
                    >
                      English
                      <ChevronDown size={14} />
                    </button>
                  </div>

                  {settings.map((setting) => (
                    <div
                      key={setting.id}
                      className="flex items-center justify-between"
                    >
                      <span className="font-medium leading-5 text-[#0F172A]">
                        {setting.label}
                      </span>
                      <Toggle
                        enabled={setting.enabled}
                        onToggle={() => toggleSetting(setting.id)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>

          <SectionNav
            activePanel={activePanel}
            onPanelChange={setActivePanel}
            onLogout={() => setIsLogoutOpen(true)}
          />
        </main>
      </div>

      {isLogoutOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-[rgba(15,23,42,0.45)]">
          <div className="w-[400px] rounded-[16px] bg-white px-5 py-6 shadow-[0px_32px_64px_rgba(0,0,0,0.16),0px_4px_24px_rgba(8,8,8,0.08)]">
            <h3 className="mb-4 text-center text-[32px] font-bold leading-6 text-[#0F172A]">
              Log out
            </h3>
            <p className="mb-4 text-center text-lg font-medium leading-3 text-[#0F172A]">
              Are you really want to log out?
            </p>
            <div className="flex items-center justify-between gap-2">
              <button
                type="button"
                onClick={() => setIsLogoutOpen(false)}
                disabled={logout.isPending}
                className="h-12 flex-1 rounded-2xl text-lg font-medium text-[#0F172A] disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleLogout}
                disabled={logout.isPending}
                className="flex h-12 flex-1 items-center justify-center rounded-2xl bg-gradient-to-b from-[#FF8D70] to-[#FF5C35] text-lg font-medium text-white disabled:opacity-60"
              >
                {logout.isPending ? (
                  <div className="size-5 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                ) : (
                  "Log Out"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
