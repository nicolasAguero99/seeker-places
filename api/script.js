const $form = document.getElementById('uploadForm')
const $input = $form.querySelector('input[id="fileInput"]')
const $url = $form.querySelector('input[id="fileInputText"]')

$form.addEventListener('submit', async (e) => {
  e.preventDefault()
  // const file = $input.files[0]
  // const formData = new FormData()
  // formData.append('file', file)
  console.log('click')
  // const res = await fetch('http://127.0.0.1:8000/file-txt', {
  //   method: 'POST',
  //   body: formData
  // })
  console.log('$url.value', $url.value)

  const res = await fetch('http://127.0.0.1:8000/url', {
    method: 'POST',
    body: JSON.stringify({url: $url.value})
  })
  const data = await res.json()
  console.log(data)
})