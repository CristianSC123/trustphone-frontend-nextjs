"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { User, ShoppingBag, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

interface UserMenuProps {
  user: any;
  onLogout: () => void;
}

export default function UserMenu({ user, onLogout }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center space-x-2 hover:bg-blue-50"
        >
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900">
              {user.nombre} {user.apellido}
            </p>
            <Badge variant="outline" className="text-xs">
              {user.role === "cliente" ? "Cliente" : "Cliente"}
            </Badge>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">
            {user.nombre} {user.apellido}
          </p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
        <DropdownMenuSeparator />

        {
          <Link href="/mis-compras">
            <DropdownMenuItem>
              <ShoppingBag className="w-4 h-4 mr-2" />
              Mis Compras
              <DropdownMenuSeparator />
            </DropdownMenuItem>
          </Link>
        }
        <DropdownMenuSeparator />

        {
          <Link href="/mis-reservas">
            <DropdownMenuItem>
              <ShoppingBag className="w-4 h-4 mr-2" />
              Mis Reservas
              <DropdownMenuSeparator />
            </DropdownMenuItem>
          </Link>
        }
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onLogout} className="text-red-600">
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
