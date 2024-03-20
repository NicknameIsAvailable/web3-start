"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useSDK } from "@metamask/sdk-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import MetamaskLogo from "/public/icons/metamask.svg";
import { formatAddress, getAccount } from "@/lib/utils";
import { Sheet } from "lucide-react";
import { SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const ProfileBadge = () => {
  const [accounts, setAccounts] = useState<any>();
  const { sdk, connected, connecting, account, balance } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    try {
      sdk?.terminate();
    } catch (err) {
      console.warn("Error", err);
    }
  };

  useEffect(() => {
    getAccount()
      .then((response) => setAccounts(response))
      .catch((error) => console.error("Error fetching accounts:", error));
  }, []);

  console.log(accounts);

  return (
    <>
      {connected ? (
        <Dialog>
          <DialogTrigger asChild>
            <Badge className="cursor-pointer">
              <Image className="w-6 h-6 mr-2" src={MetamaskLogo} alt={""} />
              {formatAddress(account)}
            </Badge>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Профиль</DialogTitle>
              <DialogDescription>Это твой профиль</DialogDescription>
            </DialogHeader>
            <Card className="flex gap-6 items-center p-4">
              <Image className="w-8 h-8 mr-2" src={MetamaskLogo} alt={""} />
              <h5 className="text-xl">{formatAddress(accounts[0], 20)}</h5>
            </Card>
            <DialogFooter>
              <DialogClose asChild>
                <Button onClick={disconnect} variant="destructive">
                  Выйти
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ) : (
        <Button onClick={connect}>
          <Image
            className="mr-2 h-4 w-4"
            src={MetamaskLogo}
            alt={MetamaskLogo.src}
          />
          {connecting ? "Авторизация..." : "Авторизоваться"}
        </Button>
      )}
    </>
  );
};

export default ProfileBadge;
