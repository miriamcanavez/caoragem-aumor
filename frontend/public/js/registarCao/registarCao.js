// Adiciona funcionalidade de upload de imagens ao clicar nas imagens vazias
document.addEventListener('DOMContentLoaded', function() {
  const imagensVazias = document.querySelectorAll('.imagem-empty');
  
  imagensVazias.forEach((imagemDiv, index) => {
    // Adiciona cursor pointer
    imagemDiv.style.cursor = 'pointer';
    
    // Adiciona evento de clique
    imagemDiv.addEventListener('click', function() {
      const inputFile = document.getElementById(`file-input-${index}`);
      if (inputFile) {
        inputFile.click();
      }
    });
  });

  // Adiciona funcionalidade de apagar nas imagens com foto
  const imagensFotos = document.querySelectorAll('.imagem-foto');
  
  imagensFotos.forEach((imagemDiv, index) => {
    imagemDiv.addEventListener('click', function(e) {
      // Pegar o path da imagem
      const img = imagemDiv.querySelector('img');
      if (!img) return;
      
      const src = img.getAttribute('src');
      const pathMatch = src.match(/\/uploads\/caes\/fotos\/(.+)$/);
      
      if (!pathMatch) return;
      
      const pathFoto = pathMatch[1];
      
      if (confirm('Deseja apagar esta imagem?')) {
        apagarImagem(pathFoto, imagemDiv, index);
      }
    });
  });

  // Adiciona funcionalidade aos inputs de arquivo
  const fileInputs = document.querySelectorAll('.file-input-hidden');
  
  fileInputs.forEach((input, index) => {
    input.addEventListener('change', async function(event) {
      const file = event.target.files[0];
      
      if (!file) {
        return;
      }

      // Validar tipo de arquivo
      const tiposPermitidos = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!tiposPermitidos.includes(file.type)) {
        alert('Por favor, selecione apenas imagens (JPG, PNG, GIF, WEBP)');
        return;
      }

      // Validar tamanho (máximo 5MB)
      const tamanhoMaximo = 5 * 1024 * 1024; // 5MB em bytes
      if (file.size > tamanhoMaximo) {
        alert('A imagem é muito grande. O tamanho máximo é 5MB.');
        return;
      }

      // Pegar o nome do cão do input (obrigatório)
      const nomeInput = document.querySelector('input[type="text"].resposta');
      if (!nomeInput || nomeInput.value.trim() === '') {
        alert('Por favor, preencha o nome do animal antes de adicionar imagens.');
        return;
      }

      // Criar FormData para enviar o arquivo
      const formData = new FormData();
      formData.append('imagem', file);
      formData.append('index', index);
      formData.append('nomeCao', nomeInput.value.trim());
      
      // Pegar o ID do cão se estiver editando
      const urlParams = window.location.pathname.split('/');
      const idCao = urlParams[urlParams.length - 1];
      if (idCao && idCao !== 'registarCao') {
        formData.append('idCao', idCao);
      }

      try {
        // Mostrar feedback visual
        const imagemDiv = document.querySelectorAll('.imagens > div')[index];
        const originalContent = imagemDiv.innerHTML;
        imagemDiv.innerHTML = '<p style="margin: auto;">A carregar...</p>';

        // Enviar para o servidor
        const response = await fetch('/registarCao/upload', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error('Erro ao fazer upload da imagem');
        }

        const result = await response.json();

        if (result.success) {
          // Atualizar a imagem na página
          imagemDiv.classList.remove('imagem-empty');
          imagemDiv.classList.add('imagem-foto');
          imagemDiv.innerHTML = `<img src="/uploads/caes/fotos/${result.path}" />`;
          imagemDiv.style.cursor = 'default';
        } else {
          alert('Erro ao fazer upload: ' + (result.message || 'Erro desconhecido'));
          imagemDiv.innerHTML = originalContent;
        }
      } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao fazer upload da imagem. Por favor, tente novamente.');
        const imagemDiv = document.querySelectorAll('.imagens > div')[index];
        imagemDiv.innerHTML = '<img src="/images/camera.png" />';
      }
    });
  });
});

// Função para apagar imagem
async function apagarImagem(pathFoto, imagemDiv, index) {
  try {
    const response = await fetch('/registarCao/apagar-imagem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ path: pathFoto })
    });

    const result = await response.json();

    if (result.success) {
      // Transformar de volta em imagem-empty
      imagemDiv.classList.remove('imagem-foto');
      imagemDiv.classList.add('imagem-empty');
      imagemDiv.innerHTML = '<img src="/images/camera.png" />';
      imagemDiv.style.cursor = 'pointer';
      
      // Readicionar evento de clique para upload
      imagemDiv.addEventListener('click', function() {
        const inputFile = document.getElementById(`file-input-${index}`);
        if (inputFile) {
          inputFile.click();
        }
      });
    } else {
      alert('Erro ao apagar imagem: ' + (result.message || 'Erro desconhecido'));
    }
  } catch (error) {
    console.error('Erro:', error);
    alert('Erro ao apagar a imagem. Por favor, tente novamente.');
  }
}
