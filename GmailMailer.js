import React, {useCallback, useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, FlatList} from 'react-native';
import {revoke} from 'react-native-app-auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import moment from 'moment';

export default function GmailMailer() {
  const [accessToken, setAccessToken] = React.useState('');
  const [labels, setLabels] = React.useState([]);
  const [error, setError] = React.useState('');
  const [filteredEmails, setFilteredEmails] = useState([]);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        'email',
        'profile',
        // 'https://www.googleapis.com/auth/gmail.labels',
        'https://www.googleapis.com/auth/gmail.readonly',
        'https://www.googleapis.com/auth/gmail.send',
        // 'https://www.googleapis.com/auth/gmail.modify',
      ],
      webClientId:
        '883265381557-3psegkbmibel90b8lmcln5b30m6mg3tj.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const fetchFilteredEmails = async () => {
    try {
      // Ensure you have a valid access token
      const token = accessToken; // Replace this with your access token retrieval logic
      const baseUrl = 'https://www.googleapis.com/gmail/v1/users/me/messages';
      const filterQuery = encodeURIComponent(
        `((from: 'yash.vhits@gmail.com' AND to: 'testreact65@gmail.com') OR (from: 'testreact65@gmail.com' AND to: 'yash.vhits@gmail.com')) AND (in:inbox OR in:sent)`,
      );

      const url = `${baseUrl}?q=${filterQuery}&maxResults=100`; // Adjust maxResults as needed
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        const messages = data.messages;

        if (messages) {
          const formattedEmails = messages.map(async msg => {
            const messageId = msg.id;

            // Fetch details for each filtered message (optional)
            const detailsUrl = `${baseUrl}/${messageId}`;
            const detailsResponse = await fetch(detailsUrl, {
              method: 'GET',
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (detailsResponse.ok) {
              const messageDetails = await detailsResponse.json();
              console.log('messageDetails', JSON.stringify(messageDetails));

              return formatMessageDetails(messageDetails);
            } else {
              console.error(
                'Error fetching message details:',
                detailsResponse.statusText,
              );
              return null;
            }
          });

          // Wait for all formatting promises to resolve
          const formattedEmailsData = await Promise.all(formattedEmails);
          setFilteredEmails(formattedEmailsData.filter(Boolean));
        } else {
          console.log('No filtered messages found.');
        }
      } else {
        console.error('Error listing filtered emails:', response.statusText);
      }
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const signInWithGoogle = useCallback(async () => {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const accessToken = await GoogleSignin.getTokens();
      console.log('accessToken', accessToken);
      console.log('userInfo', userInfo);

      setAccessToken(accessToken.accessToken);
    } catch (error) {
      console.log('error.code google', error);
    }
  }, []);

  // Function to log out and revoke access
  const handleLogout = async () => {
    try {
      await revoke(config, {tokenToRevoke: accessToken});
      setAccessToken('');
      setLabels([]);
    } catch (error) {
      setError('Error revoking access: ' + error.message);
    }
  };

  const formatMessageDetails = messageDetails => {
    const label = messageDetails?.labelIds[0] || 'Unknown';
    const from =
      messageDetails?.payload?.headers?.find(header => header.name === 'From')
        ?.value || 'Unknown';
    const fromName =
      messageDetails.from?.[0]?.name ||
      messageDetails.from?.[0]?.email ||
      'Unknown'; // Try using email as fallback
    const to =
      messageDetails?.payload?.headers?.find(header => header.name === 'To')
        ?.value || 'Unknown';
    const toName =
      messageDetails.to?.[0]?.name ||
      messageDetails.to?.[0]?.email ||
      'Unknown'; // Try using email as fallback
    const subject =
      messageDetails.payload?.headers?.find(header => header.name === 'Subject')
        ?.value || 'No Subject';
    const snippet = messageDetails.snippet || 'No content';
    const date =
      messageDetails?.payload?.headers?.find(header => header.name === 'Date')
        ?.value || ''; // Format date using moment

    return {
      from,
      fromName,
      to,
      toName,
      subject,
      snippet,
      date,
      label,
    };
  };

  useEffect(() => {
    const isAlreadyLoggedIn = async () => {
      const isSignedIn = GoogleSignin.hasPreviousSignIn();

      if (isSignedIn) {
        const accessToken = await GoogleSignin.getTokens();
        setAccessToken(accessToken.accessToken);
      }
    };
    isAlreadyLoggedIn();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Gmail Label Viewer</Text>
      {accessToken ? (
        <View>
          <Button title="Log Out" onPress={handleLogout} />
          <Button title="Fetch Mails" onPress={fetchFilteredEmails} />
          <Text style={styles.label} numberOfLines={1}>
            Access Token: {accessToken}
          </Text>
          <FlatList
            data={filteredEmails}
            renderItem={({item, index}) => (
              <View style={styles.messageContainer} key={index}>
                <Text style={styles.fromEmailText}>To: {item.to}</Text>
                <Text style={styles.fromEmailText}>From: {item.from}</Text>
                <Text style={styles.subjectText}>Subject: {item.subject}</Text>
                <Text style={styles.snippetText}>Snippet: {item.snippet}</Text>
                <Text
                  style={[
                    styles.snippetText,
                    {
                      color: item.label === 'SENT' ? 'green' : 'red',
                      textDecorationLine:
                        item.label === 'SENT' ? 'underline' : 'none',
                    },
                  ]}>
                  Label: {item.label}
                </Text>
                <Text>Date: {moment(item.date).format('lll')}</Text>
              </View>
            )}
            keyExtractor={item => item.id}
          />
        </View>
      ) : (
        <>
          <Button title="Log In with Google" onPress={signInWithGoogle} />
        </>
      )}
      {error !== '' && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  fromText: {
    fontWeight: 'bold',
  },
  subjectText: {
    fontSize: 14,
    marginBottom: 5,
    color: 'gray',
  },
  snippetText: {
    color: 'gray',
    marginBottom: 5,
    fontSize: 14,
  },
  fromEmailText: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
});
