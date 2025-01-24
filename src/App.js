import './App.css';
import { useState } from 'react';

function App() {
  const [searchType, setSearchType] = useState('user');
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('DirectoryOne')

  const fetchSearchResult = async () => {
    try{

      const route = activeTab === 'DirectoryOne' ? 'DirectoryOne' : 'DirectoryTwo';
      const endpoint = searchType === 'user' ? 'user' : 'group';
      const response = await fetch(`/api/${route}/${endpoint}/${searchId}`);

      if (!response.ok){
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setSearchResult(data);
      setError(null);
    }catch (err) {
      console.error('Failed to fetch result:', err);
      setError(err.message);
      setSearchResult(null);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ldap Directory Viewer</h1>
        <div className="tabs">
          <button
            className={`tab ${activeTab === "DirectoryOne" ? 'active' : ''}`}
            onClick={() => setActiveTab('DirectoryOne')}
            >
              DirectoryOne
            </button>
            <button
            className={`tab ${activeTab === "DirectoryTwo" ? 'active' : ''}`}
            onClick={() => setActiveTab('DirectoryTwo')}
            >
              DirectoryTwo
            </button>
        </div>
      </header>
      <main>
        <div className='search-controls'>
          <select
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="user">User</option>
            <option value="group">Group</option>
          </select>
          <input
            type='text'
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            placeholder={`Enter ${searchType === 'user' ? 'User ID' : 'Group Name'}`}
          />
          <button onClick={fetchSearchResult}>Fetch Information</button>
        </div>
        {error && <div className="error">{error}</div>}
        {searchResult && (
          <div>
            <h2>{searchType === 'user' ? 'User' : 'Group'}</h2>
            <table className='info-table'>
              <tbody>
                {Object.entries(searchResult).map(([key, value]) => (
                <tr key={key}>
                  <td className='key'>{key}</td>
                  <td className='value'>{value}</td>
                </tr>
                
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
