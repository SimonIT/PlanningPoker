package de.simonbullik.planningpoker;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.ldap.AuthenticationException;
import org.springframework.ldap.core.support.LdapContextSource;

import javax.naming.NamingEnumeration;
import javax.naming.directory.DirContext;
import javax.naming.directory.SearchControls;
import javax.naming.directory.SearchResult;

@SpringBootTest
public class LdapTest {

    @Autowired
    private LdapContextSource contextSource;

    @Test
    public void authenticateTest() throws Exception {
        try {
            DirContext context = contextSource
                    .getContext("CN=admin,OU=User,OU=HEC,OU=NEUSTA,DC=intern,DC=neusta,DC=de", "Praktikum2018");

            String searchFilter = "(&(sAMAccountType=805306368)(!(userAccountControl:1.2.840.113556.1.4.803:=2)))";

            SearchControls searchControls = new SearchControls();
            searchControls.setSearchScope(SearchControls.SUBTREE_SCOPE);

            NamingEnumeration<SearchResult> results = context.search("OU=NEUSTA", searchFilter, searchControls);

            int i = 0;
            while (results.hasMore()) {
                SearchResult element = results.next();
                System.err.println(element.getName() + ": " + element.getAttributes().get("mail"));
                i++;
            }
            System.out.println(i);

        } catch (AuthenticationException ex) {
            if (ex.getMessage().contains("52e")) {
                throw new IllegalArgumentException("PASSWORT FALSCH");
            } else {
                throw ex;
            }
        }
    }

}
