// THIS FILE IS AUTOMATICALLY GENERATED. DO NOT MODIFY IT.

import { Asset, Entry } from "contentful";
import { Document } from "@contentful/rich-text-types";

export interface IBlogPostFields {
  /** Blog Title */
  blogTitle: string;

  /** slug */
  slug: string;

  /** Blog body */
  blogBody: Document;
}

/** Blog content */

export interface IBlogPost extends Entry<IBlogPostFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "blogPost";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IContactFormDestinationEMailAddressFields {
  /** Contact form destination e-mail address */
  contactFormDestinationEMailAddress?: string | undefined;

  /** Email Address */
  emailAddress: string;
}

/** Any messages entered by visitors through the contact form will be sent to this e-mail address */

export interface IContactFormDestinationEMailAddress
  extends Entry<IContactFormDestinationEMailAddressFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "contactFormDestinationEMailAddress";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IEventFields {
  /** Event Title */
  title: string;

  /** Date and start time */
  dateAndStartTime: string;

  /** Location */
  location: { lat: number; lon: number };

  /** Description */
  description?: Document | undefined;
}

/** An event organized by the people of Hot Yoga Ghent. An event consists of a title, a date and time on which the event will take place, the location of the event and a description of the event. */

export interface IEvent extends Entry<IEventFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "event";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ILandingPageTitleFields {
  /** LandingPageTitle */
  landingPageTitle?: string | undefined;
}

/** title for the landing page, can be empty */

export interface ILandingPageTitle extends Entry<ILandingPageTitleFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "landingPageTitle";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IPageFields {
  /** Page title */
  pageTitle: string;

  /** Contents */
  contents?: Document | undefined;
}

/** A block of rich text, i.e. text with markup */

export interface IPage extends Entry<IPageFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "page";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IPriceListTableFields {
  /** priceList */
  priceList: string;

  /** priceListData */
  priceListData: Record<string, any>;
}

/** A table with price options */

export interface IPriceListTable extends Entry<IPriceListTableFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "priceListTable";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITestimonialFields {
  /** Author */
  author: string;

  /** testimonial text */
  testimonialText?: Document | undefined;

  /** Avatar */
  avatar?: Asset | undefined;
}

/** Testimonial from a Hot Yoga customer */

export interface ITestimonial extends Entry<ITestimonialFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "testimonial";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface ITimeTableFields {
  /** Timetable name */
  timetableName?: string | undefined;

  /** timetable data */
  timetableData: Record<string, any>;
}

/** The schedule of the classes at Hot Yoga Ghent */

export interface ITimeTable extends Entry<ITimeTableFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "timeTable";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export interface IValueFields {
  /** Value Title */
  valueTitle: string;

  /** Value Text */
  valueText: string;

  /** Order */
  order: number;
}

/** One of the Values of Hot Yoga Ghent */

export interface IValue extends Entry<IValueFields> {
  sys: {
    id: string;
    type: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    contentType: {
      sys: {
        id: "value";
        linkType: "ContentType";
        type: "Link";
      };
    };
  };
}

export type CONTENT_TYPE =
  | "blogPost"
  | "contactFormDestinationEMailAddress"
  | "event"
  | "landingPageTitle"
  | "page"
  | "priceListTable"
  | "testimonial"
  | "timeTable"
  | "value";

export type IEntry =
  | IBlogPost
  | IContactFormDestinationEMailAddress
  | IEvent
  | ILandingPageTitle
  | IPage
  | IPriceListTable
  | ITestimonial
  | ITimeTable
  | IValue;

export type LOCALE_CODE = "en-US";

export type CONTENTFUL_DEFAULT_LOCALE_CODE = "en-US";
