// 'use client'
// import { useState, useEffect } from 'react'
// import styled from 'styled-components'
// import { getAllLeaveRequests, updateLeaveStatus, getCurrentUser } from '@/lib/appwrite'

// const AdminDashboard = () => {
//   const [requests, setRequests] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [updatingId, setUpdatingId] = useState(null)
//   const [filter, setFilter] = useState('all')
//   const [admin, setAdmin] = useState(null)

//   useEffect(() => {
//     fetchAdminData()
//     fetchRequests()
//     setupRealtimeUpdates()
//   }, [])

//   const fetchAdminData = async () => {
//     try {
//       const adminData = await getCurrentUser()
//       setAdmin(adminData)
//     } catch (error) {
//       console.error('Error fetching admin data:', error)
//     }
//   }

//   const fetchRequests = async () => {
//     setLoading(true)
//     try {
//       const data = await getAllLeaveRequests()
//       setRequests(data)
//     } catch (error) {
//       console.error('Error:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const setupRealtimeUpdates = () => {
//     // This would be your real-time subscription implementation
//     // For now we'll use polling as a fallback
//     const interval = setInterval(fetchRequests, 30000) // Refresh every 30 seconds
//     return () => clearInterval(interval)
//   }

//   const handleStatusChange = async (requestId, status) => {
//     setUpdatingId(requestId)
//     try {
//       await updateLeaveStatus(requestId, status, `Processed by ${admin?.name || 'admin'}`)
//       await fetchRequests()
//     } catch (error) {
//       console.error('Error updating status:', error)
//     } finally {
//       setUpdatingId(null)
//     }
//   }

//   const filteredRequests = requests.filter(request => {
//     if (filter === 'all') return true
//     return request.status === filter
//   })

//   if (loading) {
//     return <LoadingContainer>Loading requests...</LoadingContainer>
//   }

//   return (
//     <Wrapper>
//     <DashboardContainer>
//       <Header>
//         <h1>Leave Request Dashboard</h1>
//         <AdminInfo>
//           <p>Logged in as: <strong>{admin?.name || 'Admin'}</strong></p>
//         </AdminInfo>
//       </Header>

//       <Controls>
//         <FilterGroup>
//           <FilterLabel>Filter by status:</FilterLabel>
//           <FilterSelect 
//             value={filter} 
//             onChange={(e) => setFilter(e.target.value)}
//           >
//             <option value="all">All Requests</option>
//             <option value="pending">Pending</option>
//             <option value="approved">Approved</option>
//             <option value="rejected">Rejected</option>
//           </FilterSelect>
//         </FilterGroup>
//         <RefreshButton onClick={fetchRequests}>Refresh</RefreshButton>
//       </Controls>

//       <StatsContainer>
//         <StatCard>
//           <StatValue>{requests.length}</StatValue>
//           <StatLabel>Total Requests</StatLabel>
//         </StatCard>
//         <StatCard>
//           <StatValue>{requests.filter(r => r.status === 'pending').length}</StatValue>
//           <StatLabel>Pending</StatLabel>
//         </StatCard>
//         <StatCard>
//           <StatValue>{requests.filter(r => r.status === 'approved').length}</StatValue>
//           <StatLabel>Approved</StatLabel>
//         </StatCard>
//         <StatCard>
//           <StatValue>{requests.filter(r => r.status === 'rejected').length}</StatValue>
//           <StatLabel>Rejected</StatLabel>
//         </StatCard>
//       </StatsContainer>

//       <RequestsTable>
//         <thead>
//           <TableHeaderRow>
//             <TableHeader>Cadet</TableHeader>
//             <TableHeader>Reason</TableHeader>
//             <TableHeader>Dates</TableHeader>
//             <TableHeader>Days</TableHeader>
//             <TableHeader>Status</TableHeader>
//             <TableHeader>Actions</TableHeader>
//           </TableHeaderRow>
//         </thead>
//         <tbody>
//           {filteredRequests.length > 0 ? (
//             filteredRequests.map(request => (
//               <TableRow key={request.$id}>
//                <TableCell>
//   {request.userName || `User ${(request.userId || '').slice(0, 6)}`}
// </TableCell>
//                 <TableCell>{request.reason}</TableCell>
//                 <TableCell>
//                   {new Date(request.startDate).toLocaleDateString()} - {' '}
//                   {new Date(request.endDate).toLocaleDateString()}
//                 </TableCell>
//                 <TableCell>{request.days}</TableCell>
//                 <TableCell>
//                   <StatusBadge status={request.status}>
//                     {request.status}
//                   </StatusBadge>
//                 </TableCell>
//                 <TableCell>
//                   {request.status === 'pending' && (
//                     <ActionButtons>
//                       <ApproveButton 
//                         onClick={() => handleStatusChange(request.$id, 'approved')}
//                         disabled={updatingId === request.$id}
//                       >
//                         {updatingId === request.$id ? 'Approving...' : 'Approve'}
//                       </ApproveButton>
//                       <RejectButton 
//                         onClick={() => handleStatusChange(request.$id, 'rejected')}
//                         disabled={updatingId === request.$id}
//                       >
//                         {updatingId === request.$id ? 'Rejecting...' : 'Reject'}
//                       </RejectButton>
//                     </ActionButtons>
//                   )}
//                   {request.status !== 'pending' && (
//                     <ProcessedText>
//                       Processed by admin
//                     </ProcessedText>
//                   )}
//                 </TableCell>
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan="6" style={{ textAlign: 'center' }}>
//                 No requests found
//               </TableCell>
//             </TableRow>
//           )}
//         </tbody>
//       </RequestsTable>
//     </DashboardContainer>
//     </Wrapper>
//   )
// }

// // Styled Components
// const Wrapper= styled.div`

// background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
// color: #000;
// `
// const DashboardContainer = styled.div`
//   padding: 2rem;
//   max-width: 1200px;
//   margin: 0 auto;
//   height: 100vh;
//   font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;

// `

// const Header = styled.header`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 2rem;
//   padding-bottom: 1rem;
//   border-bottom: 1px solid #e0e0e0;

//   h1 {
//     margin: 0;
//     color: #2c3e50;
//     font-weight: 600;

//   }
// `

// const AdminInfo = styled.div`
//   background: #f8f9fa;
//   padding: 0.5rem 1rem;
//   border-radius: 4px;
//   font-size: 0.9rem;
// `

// const Controls = styled.div`
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   margin-bottom: 1.5rem;
// `

// const FilterGroup = styled.div`
//   display: flex;
//   align-items: center;
//   gap: 0.5rem;
// `

// const FilterLabel = styled.label`
//   font-weight: 500;
// `

// const FilterSelect = styled.select`
//   padding: 0.5rem;
//   border-radius: 4px;
//   border: 1px solid rgb(14, 90, 167);
// `

// const RefreshButton = styled.button`
//   padding: 0.5rem 1rem;
//   background: #3498db;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background 0.2s;

//   &:hover {
//     background: #2980b9;
//   }
// `

// const StatsContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   gap: 1rem;
//   margin-bottom: 2rem;
// `

// const StatCard = styled.div`
//   background: white;
//   padding: 1.5rem;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//   text-align: center;
// `

// const StatValue = styled.div`
//   font-size: 2rem;
//   font-weight: bold;
//   color: #2c3e50;
//   margin-bottom: 0.5rem;
// `

// const StatLabel = styled.div`
//   color: #7f8c8d;
//   font-size: 0.9rem;
// `

// const RequestsTable = styled.table`
//   width: 100%;
//   border-collapse: collapse;
//   background: white;
//   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
//   border-radius: 8px;
//   overflow: hidden;
// `

// const TableHeaderRow = styled.tr`
//   background:rgb(134, 168, 202);
// `

// const TableHeader = styled.th`
//   padding: 1rem;
//   text-align: left;
//   font-weight: 600;
//   color: #2c3e50;
// `

// const TableRow = styled.tr`
//   border-bottom: 1px solid #e0e0e0;

//   &:last-child {
//     border-bottom: none;
//   }
// `

// const TableCell = styled.td`
//   padding: 1rem;
//   vertical-align: middle;
// `

// const StatusBadge = styled.span`
//   display: inline-block;
//   padding: 0.25rem 0.5rem;
//   border-radius: 12px;
//   font-size: 0.8rem;
//   font-weight: 500;
//   text-transform: capitalize;
//   background-color: ${props => 
//     props.status === 'approved' ? '#d4edda' :
//     props.status === 'rejected' ? '#f8d7da' :
//     '#fff3cd'};
//   color: ${props => 
//     props.status === 'approved' ? '#155724' :
//     props.status === 'rejected' ? '#721c24' :
//     '#856404'};
// `

// const ActionButtons = styled.div`
//   display: flex;
//   gap: 0.5rem;
// `

// const ApproveButton = styled.button`
//   padding: 0.5rem 1rem;
//   background: #28a745;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background 0.2s;

//   &:hover:not(:disabled) {
//     background: #218838;
//   }

//   &:disabled {
//     opacity: 0.7;
//     cursor: not-allowed;
//   }
// `

// const RejectButton = styled.button`
//   padding: 0.5rem 1rem;
//   background: #dc3545;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background 0.2s;

//   &:hover:not(:disabled) {
//     background: #c82333;
//   }

//   &:disabled {
//     opacity: 0.7;
//     cursor: not-allowed;
//   }
// `

// const ProcessedText = styled.span`
//   color: #6c757d;
//   font-size: 0.8rem;
// `

// const LoadingContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 200px;
//   font-size: 1.2rem;
//   color: #6c757d;
// `

// export default AdminDashboard

'use client'
import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getAllLeaveRequests, updateLeaveStatus, getCurrentUser, getFileDownloadUrl } from '@/lib/appwrite'

const AdminDashboard = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState(null)
  const [filter, setFilter] = useState('all')
  const [admin, setAdmin] = useState(null)
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [downloadError, setDownloadError] = useState('');

  const [documentState, setDocumentState] = useState({
    loading: false,
    error: null,
    downloadUrl: null
  });

  useEffect(() => {
    fetchAdminData()
    fetchRequests()
    setupRealtimeUpdates()
  }, [])

  const fetchAdminData = async () => {
    try {
      const adminData = await getCurrentUser()
      setAdmin(adminData)
    } catch (error) {
      console.error('Error fetching admin data:', error)
    }
  }

  const fetchRequests = async () => {
    setLoading(true)
    try {
      const data = await getAllLeaveRequests()
      setRequests(data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }


 // Handle document preview
const previewDocument = async () => {
  if (!selectedRequest?.documentId) return;
  
  setDocumentState({ loading: true, error: null, downloadUrl: null });
  
  try {
    const url = await getFileDownloadUrl(selectedRequest.documentId);
    const extension = selectedRequest.documentName?.split('.').pop()?.toLowerCase();
    
    setDocumentState({ loading: false, error: null, downloadUrl: url });
    
    if (extension === 'pdf') {
      window.open(url, '_blank');
    } 
    else if (['doc', 'docx'].includes(extension)) {
      window.open(
        `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`, 
        '_blank'
      );
    } else {
      throw new Error("Preview not available for this file type");
    }
  } catch (error) {
    setDocumentState({ 
      loading: false, 
      error: error.message, 
      downloadUrl: null 
    });
  }
};

// Handle document download
const downloadDocument = async () => {
  if (!selectedRequest?.documentId) return;
  
  setDocumentState({ loading: true, error: null, downloadUrl: null });
  
  try {
    const url = await getFileDownloadUrl(selectedRequest.documentId);
    setDocumentState({ loading: false, error: null, downloadUrl: url });
    
    const link = document.createElement('a');
    link.href = url;
    link.download = selectedRequest.documentName || `document-${selectedRequest.$id}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    setDocumentState({ 
      loading: false, 
      error: error.message, 
      downloadUrl: null 
    });
  }
};
  

  const setupRealtimeUpdates = () => {
    const interval = setInterval(fetchRequests, 30000)
    return () => clearInterval(interval)
  }

  const getDocumentType = (filename) => {
    if (!filename) return 'File';
    const ext = filename.split('.').pop().toLowerCase();
    switch (ext) {
      case 'pdf': return 'PDF Document';
      case 'doc': return 'Word Document';
      case 'docx': return 'Word Document';
      default: return `${ext.toUpperCase()} File`;
    }
  };
  const handleStatusChange = async (requestId, status) => {
    setUpdatingId(requestId)
    try {
      await updateLeaveStatus(requestId, status, `Processed by ${admin?.name || 'admin'}`)
      await fetchRequests()
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setUpdatingId(null)
    }
  }

  const handleRequestClick = (request) => {
    setSelectedRequest(request)
  }

  const closeModal = () => {
    setSelectedRequest(null)
  }

  const filteredRequests = requests.filter(request => {
    if (filter === 'all') return true
    return request.status === filter
  })

  if (loading) {
    return <LoadingContainer>Loading requests...</LoadingContainer>
  }

  return (
    <Wrapper>
      <DashboardContainer>
        <Header>
          <h1>Leave Request Dashboard</h1>
          <AdminInfo>
            <p>Logged in as: <strong>{admin?.name || 'Admin'}</strong></p>
          </AdminInfo>
        </Header>

        <Controls>
          <FilterGroup>
            <FilterLabel>Filter by status:</FilterLabel>
            <FilterSelect
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Requests</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </FilterSelect>
          </FilterGroup>
          <RefreshButton onClick={fetchRequests}>Refresh</RefreshButton>
        </Controls>

        <StatsContainer>
          <StatCard>
            <StatValue>{requests.length}</StatValue>
            <StatLabel>Total Requests</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{requests.filter(r => r.status === 'pending').length}</StatValue>
            <StatLabel>Pending</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{requests.filter(r => r.status === 'approved').length}</StatValue>
            <StatLabel>Approved</StatLabel>
          </StatCard>
          <StatCard>
            <StatValue>{requests.filter(r => r.status === 'rejected').length}</StatValue>
            <StatLabel>Rejected</StatLabel>
          </StatCard>
        </StatsContainer>

        <RequestsTable>
          <thead>
            <TableHeaderRow>
              <TableHeader>Cadet</TableHeader>
              <TableHeader>Reason</TableHeader>
              <TableHeader>Dates</TableHeader>
              <TableHeader>Days</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader>Actions</TableHeader>
            </TableHeaderRow>
          </thead>
          <tbody>
            {filteredRequests.length > 0 ? (
              filteredRequests.map(request => (
                <ClickableTableRow
                  key={request.$id}
                  onClick={() => handleRequestClick(request)}
                >
                  <TableCell>
                    {request.userName || `User ${(request.userId || '').slice(0, 6)}`}
                  </TableCell>
                  <TableCell>{request.reason}</TableCell>
                  <TableCell>
                    {new Date(request.startDate).toLocaleDateString()} - {' '}
                    {new Date(request.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{request.days}</TableCell>
                  <TableCell>
                    <StatusBadge status={request.status}>
                      {request.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    {request.status === 'pending' && (
                      <ActionButtons>
                        <ApproveButton
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStatusChange(request.$id, 'approved')
                          }}
                          disabled={updatingId === request.$id}
                        >
                          {updatingId === request.$id ? 'Approving...' : 'Approve'}
                        </ApproveButton>
                        <RejectButton
                          onClick={(e) => {
                            e.stopPropagation()
                            handleStatusChange(request.$id, 'rejected')
                          }}
                          disabled={updatingId === request.$id}
                        >
                          {updatingId === request.$id ? 'Rejecting...' : 'Reject'}
                        </RejectButton>
                      </ActionButtons>
                    )}
                    {request.status !== 'pending' && (
                      <ProcessedText>
                        Processed by admin
                      </ProcessedText>
                    )}
                  </TableCell>
                </ClickableTableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="6" style={{ textAlign: 'center' }}>
                  No requests found
                </TableCell>
              </TableRow>
            )}
          </tbody>
        </RequestsTable>
      </DashboardContainer>

      {/* Overlay and Modal */}
      {selectedRequest && (
        <>
          <Overlay onClick={closeModal} />
          <Modal>
            <ModalHeader>
              <h2>Leave Request Details</h2>
              <CloseButton onClick={closeModal}>&times;</CloseButton>
            </ModalHeader>
            <ModalContent>
              <DetailSection>
                <DetailLabel>Cadet:</DetailLabel>
                <DetailValue>{selectedRequest.userName || `User ${(selectedRequest.userId || '').slice(0, 6)}`}</DetailValue>
              </DetailSection>

              <DetailSection>
                <DetailLabel>Reason:</DetailLabel>
                <DetailValue>{selectedRequest.reason}</DetailValue>
              </DetailSection>

              <DetailSection>
                <DetailLabel>Dates:</DetailLabel>
                <DetailValue>
                  {new Date(selectedRequest.startDate).toLocaleDateString()} - {' '}
                  {new Date(selectedRequest.endDate).toLocaleDateString()}
                </DetailValue>
              </DetailSection>

              <DetailSection>
                <DetailLabel>Days:</DetailLabel>
                <DetailValue>{selectedRequest.days}</DetailValue>
              </DetailSection>

              <DetailSection>
                <DetailLabel>Status:</DetailLabel>
                <DetailValue>
                  <StatusBadge status={selectedRequest.status}>
                    {selectedRequest.status}
                  </StatusBadge>
                </DetailValue>
              </DetailSection>

              {selectedRequest.additionalNotes && (
                <DetailSection>
                  <DetailLabel>Additional Notes:</DetailLabel>
                  <DetailValue>{selectedRequest.additionalNotes}</DetailValue>
                </DetailSection>
              )}

{selectedRequest?.documentId ? (
  <DetailSection>
    <DetailLabel>Attached Document:</DetailLabel>
    
    {documentState.error && (
      <ErrorMessage>{documentState.error}</ErrorMessage>
    )}
    
    {documentState.loading ? (
      <LoadingIndicator>Loading document info...</LoadingIndicator>
    ) : (
      <>
        <DocumentInfoContainer>
          <DocumentIcon>
            {selectedRequest.documentName?.endsWith('.pdf') ? (
              <PdfIcon />
            ) : (
              <WordIcon />
            )}
          </DocumentIcon>
          <DocumentDetails>
            <DocumentName>
              {selectedRequest.documentName || 'Document'}
            </DocumentName>
            <DocumentType>
              {getDocumentType(selectedRequest.documentName)}
            </DocumentType>
          </DocumentDetails>
        </DocumentInfoContainer>

        <DocumentActions>
          {['pdf', 'doc', 'docx'].includes(
            selectedRequest.documentName?.split('.').pop()?.toLowerCase() || ''
          ) && (
            <DocumentButton 
              onClick={previewDocument}
              disabled={documentState.loading}
            >
              {documentState.loading ? 'Loading...' : 'Preview Document'}
            </DocumentButton>
          )}
          <DocumentButton 
            onClick={downloadDocument}
            disabled={documentState.loading}
          >
            {documentState.loading ? 'Preparing...' : 'Download'}
          </DocumentButton>
        </DocumentActions>
      </>
    )}
  </DetailSection>
) : (
  <DetailSection>
    <DetailLabel>Attached Document:</DetailLabel>
    <NoDocument>No document attached to this request</NoDocument>
  </DetailSection>
)}


              <DetailSection>
                <DetailLabel>Submitted:</DetailLabel>
                <DetailValue>
                  {new Date(selectedRequest.$createdAt).toLocaleString()}
                </DetailValue>
              </DetailSection>

              {selectedRequest.processedBy && (
                <DetailSection>
                  <DetailLabel>Processed By:</DetailLabel>
                  <DetailValue>{selectedRequest.processedBy}</DetailValue>
                </DetailSection>
              )}
            </ModalContent>

            {selectedRequest.status === 'pending' && (
              <ModalFooter>
                <ApproveButton
                  onClick={() => {
                    handleStatusChange(selectedRequest.$id, 'approved')
                    closeModal()
                  }}
                  disabled={updatingId === selectedRequest.$id}
                >
                  {updatingId === selectedRequest.$id ? 'Approving...' : 'Approve'}
                </ApproveButton>
                <RejectButton
                  onClick={() => {
                    handleStatusChange(selectedRequest.$id, 'rejected')
                    closeModal()
                  }}
                  disabled={updatingId === selectedRequest.$id}
                >
                  {updatingId === selectedRequest.$id ? 'Rejecting...' : 'Reject'}
                </RejectButton>
              </ModalFooter>
            )}
          </Modal>
        </>
      )}
    </Wrapper>
  )
}

// Styled Components
const Wrapper = styled.div`
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  color: #000;
`

const DashboardContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 100vh;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
`
const DocumentInfo = styled.span`
  font-size: 0.8rem;
  color: #666;
  margin-left: 0.5rem;
  align-self: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e0e0e0;

  h1 {
    margin: 0;
    color: #2c3e50;
    font-weight: 600;
  }
`

const AdminInfo = styled.div`
  background: #f8f9fa;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
`

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

const FilterLabel = styled.label`
  font-weight: 500;
`

const FilterSelect = styled.select`
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid rgb(14, 90, 167);
`

const RefreshButton = styled.button`
  padding: 0.5rem 1rem;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #2980b9;
  }
`

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 0.5rem;
`

const StatLabel = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`

const RequestsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
`

const TableHeaderRow = styled.tr`
  background: rgb(134, 168, 202);
`

const TableHeader = styled.th`
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #2c3e50;
`

const TableRow = styled.tr`
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`

const ClickableTableRow = styled(TableRow)`
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f5f5f5;
  }
`

const TableCell = styled.td`
  padding: 1rem;
  vertical-align: middle;
`

const StatusBadge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: capitalize;
  background-color: ${props =>
    props.status === 'approved' ? '#d4edda' :
      props.status === 'rejected' ? '#f8d7da' :
        '#fff3cd'};
  color: ${props =>
    props.status === 'approved' ? '#155724' :
      props.status === 'rejected' ? '#721c24' :
        '#856404'};
`

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const ApproveButton = styled.button`
  padding: 0.5rem 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #218838;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const RejectButton = styled.button`
  padding: 0.5rem 1rem;
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: #c82333;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`

const ProcessedText = styled.span`
  color: #6c757d;
  font-size: 0.8rem;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  font-size: 1.2rem;
  color: #6c757d;
`

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  z-index: 1001;
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e0e0e0;

  h2 {
    margin: 0;
    color: #2c3e50;
  }
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #6c757d;
  padding: 0.5rem;

  &:hover {
    color: #2c3e50;
  }
`

const ModalContent = styled.div`
  padding: 1.5rem;
`

const DetailSection = styled.div`
  margin-bottom: 1rem;
`

const DetailLabel = styled.div`
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.25rem;
`

const DetailValue = styled.div`
  color: #495057;
`

const DocumentActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
`

// const DocumentButton = styled.button`
//   padding: 0.5rem 1rem;
//   background: #3498db;
//   color: white;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;
//   transition: background 0.2s;

//   &:hover {
//     background: #2980b9;
//   }
// `

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e0e0e0;
`
const DocumentPreviewContainer = styled.div`
  width: 100%;
  min-height: 200px;
  max-height: 500px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: #f8f9fa;
`;

const UnsupportedDocument = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  color: #6c757d;
`;


const DocumentInfoContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const DocumentIcon = styled.div`
  margin-right: 1rem;
  font-size: 2rem;
  color: #d32f2f; // Red color for documents
`;

const DocumentDetails = styled.div`
  flex: 1;
`;

// Styled components
const LoadingIndicator = styled.div`
  color: #666;
  font-style: italic;
  padding: 1rem 0;
  text-align: center;
`;



const DocumentButton = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.disabled ? '#cccccc' : '#3498db'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.2s;
  margin-right: 0.5rem;

  &:hover:not(:disabled) {
    background: #2980b9;
  }
`;

const DocumentName = styled.div`
  font-weight: 500;
  margin-bottom: 0.25rem;
  word-break: break-all;
`;

const DocumentType = styled.div`
  font-size: 0.8rem;
  color: #6c757d;
`;

const ErrorMessage = styled.div`
  color: #d32f2f;
  background: #fde8e8;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 0.9rem;
`;

const NoDocument = styled.div`
  color: #6c757d;
  font-style: italic;
  padding: 0.5rem 0;
`;

const PdfIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 11h1v5H8zm4 0h1v5h-1zm4 0h1v5h-1z"/>
    <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12H8V4h4v10zm4 0h-4V4h4v10z"/>
  </svg>
);

const WordIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21.27 10.9c-.2-.4-.6-.7-1-.7h-4.8c-.4 0-.8.3-1 .7l-2.5 6.6-2.5-6.6c-.2-.4-.6-.7-1-.7H3.7c-.4 0-.8.3-1 .7l-1 2.6c-.2.4 0 .8.3 1 .3.2.7.2 1 0L4 13.1l1.2 3.3c.1.4.5.6.9.6s.8-.2.9-.6l1.2-3.3 1.2 3.3c.1.4.5.6.9.6s.8-.2.9-.6l1.2-3.3 1.4 3.8c.1.4.5.6.9.6h.2c.4-.1.6-.5.5-.9l-1.7-4.7z"/>
    <path d="M6.7 9.3h2.7c.4 0 .7-.3.7-.7V3.7c0-.4-.3-.7-.7-.7H6.7c-.4 0-.7.3-.7.7v4.9c0 .4.3.7.7.7z"/>
  </svg>
);

export default AdminDashboard