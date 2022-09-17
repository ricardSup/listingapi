async function getJson(filename){

	let resp = await fetch(`/Har/${filename}.info.har`)

		if(resp.status == 200){
			let json = await resp.json();
			return json;
		}
		throw new Error(resp.status);
}

async function getListJson(){
	let fileList = ['javascript']
	const listexclude = ['analytic', 'yandex', 'gstatic'];
	var tableRef = document.getElementById('tblUrl').getElementsByTagName('tbody')[0];
	for(const filename of fileList)
	{
		let result = await getJson(filename);
		let title = result.log.pages[0].title;
		for(var i = 0; i < result.log.entries.length; i++)
		{
			let url = result.log.entries[i].request.url;
			var newRow   = tableRef.insertRow(tableRef.rows.length);
			if (listexclude.every(x => url.indexOf(x) === -1)) {
				var newCell  = newRow.insertCell(0);
				var newText  = document.createTextNode(title);
				newCell.appendChild(newText);  

				var newCell  = newRow.insertCell(1);
				var newText  = document.createTextNode(url);
				newCell.appendChild(newText);  
			}
		}
	}
}

getListJson();

