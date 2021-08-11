import React from "react";
import { useObservableEagerState } from "observable-hooks";
import { FormattedMessage, IntlProvider } from "react-intl";

import { locale$ } from "data/locale";
import i18n from "i18n";

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // const locale = getLocale() as Locale
  const locale = useObservableEagerState(locale$);
  const messages = i18n[locale];
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

const NAMESPACE_SEPARATOR = ".";

/**
 * Component with context to set up react-intl namespace. Needs to be
 * used in tandem with the `t` component below. When the namespace
 * is set up, it is then used as a prefix for all the translation
 * strings in the component subtree.
 *
 * Namespaces may be overriden - the most proximate parent context
 * of the `t` component is used.
 *
 * If necessary, it is possible to override with a custom namespace in place.
 *
 * Example:
 * <Namespace.Provider value="myNamespace">
 *   ...
 *   <Namespace.Provider value="myOtherNamespace">
 *     ...
 *     {t`translateMe`}             <-- results in 'myOtherNamespace.translateMe'
 *     {t`customNamespace.message`} <-- results in `customNamespace.message`
 *      ...
 *   </Namespace.Provider>
 *   ...
 * </Namespace.Provider>
 */
export const Namespace = React.createContext("");

/**
 * Returns a FormattedMessage react-intl component with appropriate namespace
 */
const getNamespacedMessage = (
  id: string,
  values?: Record<string, React.ReactNode>
): React.ReactElement => (
  <Namespace.Consumer>
    {(value) => {
      const key =
        id.indexOf(NAMESPACE_SEPARATOR) !== -1 || value === ""
          ? id
          : `${value}${NAMESPACE_SEPARATOR}${id}`;
      return <FormattedMessage id={key} values={values} />;
    }}
  </Namespace.Consumer>
);

/**
 * Shortcut to efficient react-intl FormattedMessage component use.
 * It is to be used anywhere within components, and it supports both
 * calling as a function or using it as a template literal.
 *
 * Examples:
 * t`message.id`    <- use as a template literal
 * t('message.id')  <- equivalent to the above
 * t('message.id.with.variable', { variable: 'value' })
 */
function t(id: string, values?: object): React.ReactElement;
function t(
  template: TemplateStringsArray,
  ...expressions: (string | number | boolean)[]
): React.ReactElement;
function t(a: any, ...b: any[]): React.ReactElement {
  if (typeof a === "string") {
    return getNamespacedMessage(a, b[0]);
  } else {
    return getNamespacedMessage(
      String.raw(a as unknown as TemplateStringsArray, ...b)
    );
  }
}

export default t;
