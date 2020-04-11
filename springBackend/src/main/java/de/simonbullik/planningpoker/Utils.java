package de.simonbullik.planningpoker;

public class Utils {
    /**
     * @param bytes from the ldap query
     * @return a beautiful formatted GUID XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
     * ed guid
     */
    static String formatGuid(byte[] bytes) {
        String[] segments = new String[bytes.length];
        for (int i = 0; i < bytes.length; i++) {
            String byteString = Integer.toHexString(bytes[i]);
            if (byteString.length() > 2) {
                byteString = byteString.substring(byteString.length() - 2);
            }
            segments[i] = byteString;
        }
        return (segments[3] + segments[2] + segments[1] + segments[0] + '-' + segments[5] + segments[4] + '-' + segments[7] + segments[6] + '-' + segments[8] + segments[9] + '-' + segments[10] + segments[11] + segments[12] + segments[13] + segments[14] + segments[15]).toUpperCase();
    }
}
