"use client";

import React from 'react';
import { ModeToggle } from "@/components/mode-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from 'next/navigation';

export const HeaderBread = () => {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>      
            {pathNames.map((link, index) => {
              const href = `/${pathNames.slice(0, index + 1).join("/")}`;
              if (index !== pathNames.length - 1) {
                return (
                  <div key={index} className="flex items-center">
                    <BreadcrumbItem
                      key={index}
                      className="hidden md:block hover:underline font-bold"
                    >
                      <BreadcrumbLink href={href}>{link}</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="mt-1 ml-1 hidden md:block font-bold" />
                  </div>
                );
              } else {
                return (
                  <BreadcrumbItem
                    key={index}
                    className="hidden md:block hover:underline font-bold text-accent"
                  >
                    <BreadcrumbPage className="hidden md:block font-bold text-green-600">
                      {link}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                );
              }
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="float-right ml-auto mr-4">
        <ModeToggle />
      </div>
    </header>
  );
}
