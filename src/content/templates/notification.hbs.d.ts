import { AssetsPaths } from "../../helpers/assets-paths"

type NotificationTemplateVariables = {
  ASSETS_PATHS: AssetsPaths
  text: string
  primaryButtonLabel?: string
  primaryButtonDestination?: string
  secondaryButtonLabel?: string
  secondaryButtoDestination?: string
}

declare function template(variables: NotificationTemplateVariables): string
export = template
