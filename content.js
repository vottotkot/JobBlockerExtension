
// Glassdoor Adds buttons in Jl div which correspond to a job list
var browser=chrome;
var jobs = document.getElementsByClassName('jl');

browser.storage.sync.get(['blockedJobs'], function(result){ console.log(result.blockedJobs);
var BlockedList=result.blockedJobs;
for (var i = 0, l = jobs.length; i < l; i++) {
     //if job is in a Blocked jobs list, then hide it from search, if it is not in blocked list-> add a Hide button into each Job listing
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
	//apparently you cannot append to anything in chrome memory, you need to get the key from memory, modify it and re-write it.
	buttons.addEventListener ("click", function() {
		var JD=buttons.parentElement.getAttribute('data-id');
		this.parentElement.style.display= 'none';
		browser.storage.sync.get(['blockedJobs'], function(result){ var oldjob=result.blockedJobs;
				        oldjob.push(JD);
		                        browser.storage.sync.set({blockedJobs: oldjob}, function() {console.log('Value is set to ' + oldjob )});
		                        });
	});
		  
    return this;
}; 



