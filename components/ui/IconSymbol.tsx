// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolViewProps, SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  'gobackward':'settings-backup-restore', // restore preferences
  'calendar.circle': 'event',
  'list.dash': 'list', // route holydays
  'gear': 'settings', // route preferences
  'calendar': 'calendar-month',  // route index
  'ellipsis': 'more-vert', // three-dots
  'plus': 'add', // fab button
  'arrow.left': 'arrow-back', // back
  'pencil': 'edit',
  'trash': 'delete',
  'trash.circle.fill':'delete-sweep', // DELETE ALL
  'multiply': 'close',
  'bell': 'notifications',  // CAMPANELLA OUTILNED
  'bell.circle.fill': 'circle-notifications', // CAMPANELLA FILLED
  'calendar.badge.plus' : 'edit-calendar',
  'checkmark.circle.fill': 'check-circle',
  'xmark.circle': 'cancel',
  'xmark': 'close',     // X CHIUSURA
  'checkmark': 'check',  // CHECK CONFERMA
  'repeat':'repeat'

} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 28,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
