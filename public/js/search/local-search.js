window.addEventListener('load', () => {
  let loadFlag = false
  let dataObj = []
  const $searchMask = document.getElementById('search-mask')

  const openSearch = () => {
    const bodyStyle = document.body.style
    bodyStyle.width = '100%'
    bodyStyle.overflow = 'hidden'
    btf.animateIn($searchMask, 'to_show 0.5s')
    btf.animateIn(document.querySelector('#local-search .search-dialog'), 'titleScale 0.5s')
    setTimeout(() => { document.querySelector('#local-search-input input').focus() }, 100)
    if (!loadFlag) {
      search()
      loadFlag = true
    }
    // shortcut: ESC
    document.addEventListener('keydown', function f (event) {
      if (event.code === 'Escape') {
        closeSearch()
        document.removeEventListener('keydown', f)
      }
    })
  }

  const closeSearch = () => {
    const bodyStyle = document.body.style
    bodyStyle.width = ''
    bodyStyle.overflow = ''
    btf.animateOut(document.querySelector('#local-search .search-dialog'), 'search_close .5s')
    btf.animateOut($searchMask, 'to_hide 0.5s')
  }

  const searchClickFn = () => {
    document.querySelector('#search-button > .search').addEventListener('click', openSearch)
  }

  const searchClickFnOnce = () => {
    document.querySelector('#local-search .search-close-button').addEventListener('click', closeSearch)
    $searchMask.addEventListener('click', closeSearch)
    if (GLOBAL_CONFIG.localSearch.preload) dataObj = fetchData(GLOBAL_CONFIG.localSearch.path)
  }

  // check url is json or not
  const isJson = url => {
    const reg = /\.json$/
    return reg.test(url)
  }

  const fetchData = async (path) => {
    let data = []
    const response = await fetch(path)
    if (isJson(path)) {
      data = await response.json()
    } else {
      const res = await response.text()
      const t = await new window.DOMParser().parseFromString(res, 'text/xml')
      const a = await t
      data = [...a.querySelectorAll('entry')].map(item =>{
        return {
          title: item.querySelector('title').textContent,
          content: item.querySelector('content') && item.querySelector('content').textContent,
          url: item.querySelector('url').textContent
        }
      })
    }
    if (response.ok) {
      const $loadDataItem = document.getElementById('loading-database')
      $loadDataItem.nextElementSibling.style.display = 'block'
      $loadDataItem.remove()
    }
    return data
  }

  const search = () => {
    if (!GLOBAL_CONFIG.localSearch.preload) {
      dataObj = fetchData(GLOBAL_CONFIG.localSearch.path)
    }

    const $input = document.querySelector('#local-search-input input')
    const $resultContent = document.getElementById('local-search-results')
    const $loadingStatus = document.getElementById('loading-status')

    $input.addEventListener('input', function () {
      const keywords = this.value.trim().toLowerCase().split(/[\s]+/)
      if (keywords[0] !== '') $loadingStatus.innerHTML = '<i class="fas fa-spinner fa-pulse"></i>'

      $resultContent.innerHTML = ''
      let str = '<div class="search-result-list">'
      if (keywords.length <= 0) return
      let count = 0
      // perform local searching
      dataObj.then(data => {
        const phrase = keywords.join(' ').trim()
        const escapeReg = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
        const results = []

        data.forEach(item => {
          let titleRaw = item.title ? item.title.trim() : ''
          let contentRaw = item.content ? item.content.trim().replace(/<[^>]+>/g, '') : ''
          const dataUrl = item.url.startsWith('/') ? item.url : GLOBAL_CONFIG.root + item.url
          const title = titleRaw.toLowerCase()
          const content = contentRaw.toLowerCase()
          if (!title && !content) return

          let missing = false
          let occTitle = 0
          let occContent = 0
          let firstOccur = Number.MAX_SAFE_INTEGER

          keywords.forEach(k => {
            const re = new RegExp(escapeReg(k), 'gi')
            const mT = title.match(re)
            const mC = content.match(re)
            const cT = mT ? mT.length : 0
            const cC = mC ? mC.length : 0
            if (cT + cC === 0) missing = true
            occTitle += cT
            occContent += cC
            const idxT = title.indexOf(k)
            const idxC = content.indexOf(k)
            const idx = [idxT, idxC].filter(x => x >= 0).sort((a,b)=>a-b)[0]
            if (idx !== undefined) firstOccur = Math.min(firstOccur, idx)
          })
          if (missing) return

          let score = occTitle * 5 + occContent * 1
          if (phrase) {
            if (title.includes(phrase)) score += 8
            if (content.includes(phrase)) score += 4
          }
          if (Number.isFinite(firstOccur)) score += Math.max(0, 30 - Math.floor(firstOccur / 5))

          // Build highlighted title and snippet
          let highlightedTitle = titleRaw
          let start = Math.max(0, (firstOccur || 0) - 30)
          let end = Math.min(contentRaw.length, start + 130)
          let pre = start > 0 ? '...' : ''
          let post = end < contentRaw.length ? '...' : ''
          let snippet = contentRaw.substring(start, end)

          keywords.forEach(k => {
            const regS = new RegExp(escapeReg(k), 'gi')
            snippet = snippet.replace(regS, '<span class="search-keyword">' + k + '</span>')
            highlightedTitle = highlightedTitle.replace(regS, '<span class="search-keyword">' + k + '</span>')
          })

          results.push({ url: dataUrl, title: highlightedTitle, snippet: pre + snippet + post, score })
        })

        results.sort((a, b) => b.score - a.score)
        const limited = results.slice(0, 50)
        limited.forEach(r => {
          str += '<div class="local-search__hit-item"><a href="' + r.url + '" class="search-result-title">' + r.title + '</a>'
          count += 1
          if (r.snippet && r.snippet.trim()) {
            str += '<p class="search-result">' + r.snippet + '</p>'
          }
          str += '</div>'
        })

        if (count === 0) {
          str += '<div id="local-search__hits-empty">' + GLOBAL_CONFIG.localSearch.languages.hits_empty.replace(/\$\{query}/, this.value.trim()) + '</div>'
        }
        str += '</div>'
        $resultContent.innerHTML = str
        if (keywords[0] !== '') $loadingStatus.innerHTML = ''
        window.pjax && window.pjax.refresh($resultContent)
      })
    })
  }

  searchClickFn()
  searchClickFnOnce()

  // pjax
  window.addEventListener('pjax:complete', () => {
    !btf.isHidden($searchMask) && closeSearch()
    searchClickFn()
  })
})
