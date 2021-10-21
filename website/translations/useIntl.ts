import React from "react"
import { useIntl as useReactIntl, IntlShape, MessageDescriptor } from "react-intl"
import { PrimitiveType, FormatXMLElementFn } from "intl-messageformat"
import { Translation } from "./types"

interface MessageDescriptorWithTranslation extends Omit<MessageDescriptor, "id"> {
  id: keyof Translation
}

export interface IntlShapeWithTranslation extends Omit<IntlShape, "formatMessage"> {
  formatMessage(
    descriptor: MessageDescriptorWithTranslation,
    values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string>>
  ): string
  formatMessage(
    descriptor: MessageDescriptorWithTranslation,
    values?: Record<
      string,
      PrimitiveType | React.ReactNode | FormatXMLElementFn<React.ReactNode, React.ReactNode>
    >
  ): React.ReactNode
}

export const useIntl = () => {
  const reactIntl = useReactIntl()
  const intl: IntlShapeWithTranslation = reactIntl
  return intl
}
