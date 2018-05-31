
//For Glassdoor Adds buttons in Jl div
//var x= new NopeButtons('jl');
var browser=chrome;
var jobs = document.getElementsByClassName('jl');

browser.storage.sync.get(['blockedJobs'], function(result){ console.log(result.blockedJobs);
																var BlockedList=result.blockedJobs;
																	for (var i = 0, l = jobs.length; i < l; i++) {
																	 //if job is in a Blocked jobs list, then hide it from search
																	 var JD=jobs[i].getAttribute('data-id');
																					 if (BlockedList.includes(JD)){
																	 									jobs[i].style.display= 'none';	

																	 									}else{
																	 										var button=document.createElement("button"+i);
																											 var text= document.createTextNode("NOPE");
																											 jobs[i].appendChild(button,i);
																											 button.appendChild(text); 										 	
	 																										 var y=new SaveOnClick(button);

																	 									};
																							}});

function SaveOnClick (buttons){
	
	buttons.addEventListener ("click", function() {
		var JD=buttons.parentElement.getAttribute('data-id');
		this.parentElement.style.display= 'none';
		browser.storage.sync.get(['blockedJobs'], function(result){ var oldjob=result.blockedJobs;
																   console.log("oldjob" +oldjob+ "  JD is " + JD);
																   oldjob.push(JD);
																   console.log(oldjob);
																   console.log("oldjob after push" +oldjob);
																   browser.storage.sync.set({blockedJobs: oldjob}, function() {console.log('Value is set to ' + oldjob )});
																}
								);

	
	});
		  
    return this;
}; 



