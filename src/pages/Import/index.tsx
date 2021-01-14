import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import filesize from 'filesize';

import Header from '../../components/Header';
import FileList from '../../components/FileList';
import Upload from '../../components/Upload';

import { Container, Title, ImportFileContainer, Footer } from './styles';

import alert from '../../assets/alert.svg';
import api from '../../services/api';

interface FileProps {
  file: File;
  name: string;
  readableSize: string;
}

const Import: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<FileProps[]>([]);
  const history = useHistory();

  async function handleUpload(): Promise<void> {
    try {
      // await api.post('/transactions/import', response);
      const data = new FormData();

      const file = uploadedFiles[0];

      data.append('file', file.file);
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      };

      await api.post('/transactions/import', data, config);

      const updatedFileList = uploadedFiles.slice(1);
      console.log(updatedFileList);
      if (updatedFileList.length === 0) {
        setUploadedFiles([]);
      }
      setUploadedFiles(updatedFileList);
      // const response = await Promise.all(
      //   uploadedFiles.map(file => {
      //     data.append('file', file.file);
      //     const config = {
      //       headers: { 'content-type': 'multipart/form-data' },
      //     };

      //     return api.post('/transactions/import', data, config);
      //   }),
      // );

      // Promise.resolve(response);
    } catch (err) {
      console.log(err.response.error);
    }
  }

  function submitFile(files: File[]): void {
    files.map(file => {
      const newUploadedFile: FileProps = {
        file,
        name: file.name,
        readableSize: filesize(file.size),
      };

      return setUploadedFiles([...uploadedFiles, newUploadedFile]);
    });
  }

  return (
    <>
      <Header size="small" />
      <Container>
        <Title>Importar uma transação</Title>
        <ImportFileContainer>
          <Upload onUpload={submitFile} />
          {!!uploadedFiles.length && <FileList files={uploadedFiles} />}

          <Footer>
            <div>
              <p>
                <img src={alert} alt="Alert" />
                Permitido apenas arquivos CSV
              </p>
              <p>
                <img src={alert} alt="Alert" />
                Selecionar um arquivo por vez. Os arquivos serão colocados na
                fila e enviados em ordem, um por vez
              </p>
            </div>
            <button onClick={handleUpload} type="button">
              Enviar
            </button>
          </Footer>
        </ImportFileContainer>
      </Container>
    </>
  );
};

export default Import;
