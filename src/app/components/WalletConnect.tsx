import { useState } from 'react';
import useConnect from '@arcblock/did-connect/lib/Connect/use-connect';
import Button from '@mui/material/Button';
import { useParams } from 'next/navigation';

function RequestProfileConnect() {
  const { connectApi, connectHolder } = useConnect();
  const [connectedUser, setConnectedUser] = useState({});
  const params = useParams();
  const locale = params.locale;
  const openConnect = () => {
    connectApi.open({
      action: 'request-profile',
      locale: locale,
      onSuccess({ result }) {
				setConnectedUser(result);
      },
      messages: {
        title: 'Request user profile',
        scan: 'Please provide your name and email to continue'
      },
    });
  }

  return (
    <header className="app-header">
      {!connectedUser && (
        <Button type="button" variant="contained" size="large" onClick={openConnect}>
          Continue With
        </Button>
      )}
      {connectedUser && (
        <div style={{ textAlign: 'left' }}>
          Connected: <pre>{JSON.stringify(connectedUser, null, 2)}</pre>
          <button type="button" onClick={​openConnect}>
            Switch User
          </button>
        </div>
      )}
      {connectHolder}
    </header>
  );
}

export default RequestProfileConnect;