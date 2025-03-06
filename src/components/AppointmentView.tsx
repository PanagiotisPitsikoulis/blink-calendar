import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { QRCodeSVG } from "qrcode.react";
import { LanguageStrings } from "@/config/languages";
import { Badge } from "./ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Copy, Check, AlertCircle, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";

interface AppointmentViewProps {
  strings: LanguageStrings;
  eventTitle: string;
  eventDescription: string;
  studioLocation: string;
  date?: Date;
  time: string;
  calendarUrls: {
    google: string;
    apple: string;
    icsContent: string;
  };
  language: string;
  onBackToAdmin: () => void;
}

export function AppointmentView({
  strings,
  eventTitle,
  eventDescription,
  studioLocation,
  date,
  time,
  calendarUrls,
  language,
  onBackToAdmin,
}: AppointmentViewProps) {
  const [copiedGoogle, setCopiedGoogle] = useState(false);
  const [copiedApple, setCopiedApple] = useState(false);

  const handleCopy = async (text: string, isGoogle: boolean) => {
    console.log("Copying to clipboard:", isGoogle ? "Google URL" : "Apple URL");
    await navigator.clipboard.writeText(text);
    if (isGoogle) {
      console.log("Setting Google copied state");
      setCopiedGoogle(true);
      setTimeout(() => {
        console.log("Resetting Google copied state");
        setCopiedGoogle(false);
      }, 2000);
    } else {
      console.log("Setting Apple copied state");
      setCopiedApple(true);
      setTimeout(() => {
        console.log("Resetting Apple copied state");
        setCopiedApple(false);
      }, 2000);
    }
  };

  return (
    <Card>
      <CardHeader className='grid grid-cols-3'>
        <div className='col-span-2 flex flex-col gap-2'>
          <CardTitle>{eventTitle}</CardTitle>
          <CardDescription>
            {eventDescription}
            <br />
            {strings.address}: {studioLocation}
          </CardDescription>
          {(date || time) && (
            <div className='text-center mb-4 flex flex-col md:flex-row gap-2'>
              {date && (
                <Badge variant={"outline"}>
                  {strings.selectedDate}:{" "}
                  {date.toLocaleDateString(
                    language === "el" ? "el-GR" : "en-US"
                  )}
                </Badge>
              )}
              {time && (
                <Badge variant={"outline"}>
                  {strings.selectedTime}: {time}
                </Badge>
              )}
            </div>
          )}
        </div>
        <div className='w-full flex items-center justify-end'>
          <Link href='https://www.blinktattoo.gr/'>
            <Image
              src='/blink.avif'
              className='shrink-0'
              alt='Blink Tattoo Studio Logo'
              width={60}
              height={60}
            />
          </Link>
        </div>
      </CardHeader>
      <CardContent className='border-b pb-6'>
        <div className='w-full aspect-video rounded-lg overflow-hidden border'>
          <iframe
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3027.9894663369273!2d22.947742475455065!3d40.63011427140611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14a839c49ed075a9%3A0xd7453ae846989fe8!2sBLINK%20TATTOO%20STUDIO!5e0!3m2!1sel!2sgr!4v1741291566119!5m2!1sel!2sgr'
            className='w-full h-full'
            style={{ border: 0 }}
            allowFullScreen
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          />
        </div>
      </CardContent>
      <CardContent className='space-y-8'>
        {date && time ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
            <div className='flex flex-col items-center gap-4'>
              <Badge>Google Calendar</Badge>
              <QRCodeSVG value={calendarUrls.google} size={300} />
              <div className='flex w-full max-w-sm items-center space-x-2'>
                <Input
                  value={calendarUrls.google}
                  readOnly
                  className='text-xs'
                />
                <Button
                  size='icon'
                  variant='outline'
                  onClick={() => handleCopy(calendarUrls.google, true)}
                  title={copiedGoogle ? strings.linkCopied : strings.copyLink}
                >
                  {copiedGoogle ? (
                    <Check className='h-4 w-4' />
                  ) : (
                    <Copy className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </div>

            <div className='flex flex-col items-center gap-4'>
              <Badge>Apple Calendar</Badge>
              <QRCodeSVG value={calendarUrls.icsContent} size={300} />
              <div className='flex w-full max-w-sm items-center space-x-2'>
                <Input
                  value={calendarUrls.icsContent}
                  readOnly
                  className='text-xs'
                />
                <Button
                  size='icon'
                  variant='outline'
                  onClick={() => handleCopy(calendarUrls.icsContent, false)}
                  title={copiedApple ? strings.linkCopied : strings.copyLink}
                >
                  {copiedApple ? (
                    <Check className='h-4 w-4' />
                  ) : (
                    <Copy className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className='space-y-6'>
            <Alert variant='destructive'>
              <AlertCircle className='h-4 w-4' />
              <AlertTitle>{strings.incompleteInformation}</AlertTitle>
              <AlertDescription>
                {strings.incompleteInformationDescription}
              </AlertDescription>
            </Alert>
            <Button onClick={onBackToAdmin}>
              <ArrowLeft className='mr-2 h-4 w-4' />
              {strings.backToForm}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
