// use async_trait::async_trait;
// use casper_binary_port::{
//     BinaryRequest, BinaryResponse, BinaryResponseAndRequest, ErrorCode, GetRequest,
//     InformationRequest, NodeStatus, PayloadEntity, RecordId,
// };
// use casper_types::bytesrepr::{self, FromBytes};

// #[derive(Debug, thiserror::Error, PartialEq, Eq)]
// pub enum Error {
//     #[error("failed to deserialize a response: {0}")]
//     Deserialization(String),
//     #[error("unexpectedly received an empty envelope")]
//     EmptyEnvelope,
//     #[error("unexpected payload variant received in the response: {0}")]
//     UnexpectedVariantReceived(u8),
//     #[error("received an unexpected node error: {message} ({code})")]
//     UnexpectedNodeError { message: String, code: u16 },
// }
// impl Error {
//     fn from_error_code(code: u16) -> Self {
//         match ErrorCode::try_from(code) {
//             Ok(err) => Self::UnexpectedNodeError {
//                 message: err.to_string(),
//                 code,
//             },
//             Err(err) => Self::UnexpectedNodeError {
//                 message: err.to_string(),
//                 code,
//             },
//         }
//     }
// }

// #[async_trait]
// pub trait NodeClient: Send + Sync {
//     async fn send_request(&self, req: BinaryRequest) -> Result<BinaryResponseAndRequest, Error>;

//     async fn read_record(
//         &self,
//         record_id: RecordId,
//         key: &[u8],
//     ) -> Result<BinaryResponseAndRequest, Error> {
//         let get = GetRequest::Record {
//             record_type_tag: record_id.into(),
//             key: key.to_vec(),
//         };
//         self.send_request(BinaryRequest::Get(get)).await
//     }

//     async fn read_info(&self, req: InformationRequest) -> Result<BinaryResponseAndRequest, Error> {
//         let get = req.try_into().expect("should always be able to convert");
//         self.send_request(BinaryRequest::Get(get)).await
//     }

//     async fn read_node_status(&self) -> Result<NodeStatus, Error> {
//         let resp = self.read_info(InformationRequest::NodeStatus).await?;
//         parse_response::<NodeStatus>(&resp.into())?.ok_or(Error::EmptyEnvelope)
//     }
// }

// fn parse_response<A>(resp: &BinaryResponse) -> Result<Option<A>, Error>
// where
//     A: FromBytes + PayloadEntity,
// {
//     if resp.is_not_found() {
//         return Ok(None);
//     }
//     if !resp.is_success() {
//         return Err(Error::from_error_code(resp.error_code()));
//     }
//     match resp.returned_data_type_tag() {
//         Some(found) if found == u8::from(A::PAYLOAD_TYPE) => {
//             bytesrepr::deserialize_from_slice(resp.payload())
//                 .map(Some)
//                 .map_err(|err| Error::Deserialization(err.to_string()))
//         }
//         Some(other) => Err(Error::UnexpectedVariantReceived(other)),
//         _ => Ok(None),
//     }
// }
