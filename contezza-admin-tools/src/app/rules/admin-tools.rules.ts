import { RuleContext } from '@alfresco/adf-extensions';

/**
 * Checks if user profile is available.
 */
export const hasProfile = (context: RuleContext): boolean => context?.profile && 'groups' in context.profile;

/**
 * Checks if current user is member of group 'GROUP_ALFRESCO_ADMINISTRATORS'.
 */
export const isAdmin = (context: RuleContext): boolean => hasProfile(context) && !!context.profile.groups.find((group) => group['id'] === 'GROUP_ALFRESCO_ADMINISTRATORS');
