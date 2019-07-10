# portfolioWebsiteTemplate
<h3>Hey, and Welcome!</h3>
<p>
This is a website portfolio template where users don't need to code to update their page!. <br>
Users can register/login to create work experience or project/other experiences posts or edit existing ones, while dynamically updating their web page.<br>
The process to set this up should take about 30 min.
</p>

<h3>The Setup</h3>
<ol>
<li>Clone/download the repository.</li>
<li>Delete the .git file in the repository and initialize a new repository on your github.</li>
<li>Push this repo to your Github.</li>
</ol>

<h3>Setting Up your Heroku Account</h3>
<p>
If you don't already know what Heroku is or have an account, now is a good time!<br>
Heroku is a free resource to host your web applications that have a back end, and we will utilize their add-on features to connect to their mongodb.
</p>

<ol>
<li>Go to <a href="https://signup.heroku.com/">Heroku</a> and create an account.</li>
<li>Add your credit card or any card (It doesn't charge unless you want to upgrade to a better server, but the standard is still really good!).</li>
<li>Head to your <a href="https://dashboard.heroku.com/apps">Dashboard</a> and create a new app.</li>
<li>After creating your app name (Beware, your app name is your <app name>.herokuapp.com), head to the <strong>Resources</strong> tab.</li>
<li>In the search box, search for mLab and select the add-on (click provision).</li>
<li>Click on your new add-on and you'll be directed to mLab's page.</li>
<li>Select the users tab and click add user. You want to allow access to a new user to access your database.</li>
<li>Copy the MongoURI in the section above, it should be the second string and should look something like this: mongodb://<dbuser>:<dbpassword>@ds247827.mlab.com:#####/heroku_id</li>
<li>Open up your cloned repository in your  preferred text editor, and navigate to /config/keys.js file. Notice that there is an empty string field in next to the mongoURI key.</li>
<li>Paste the mongoURI key you copied, and replace the <dbuser> with the username and the <dbpassword> with the password you chose (NOTE: remove the angle brackets <>).</li>
<li>Push your repo to your Github.</li>
  <li>Head back to Heroku and navigate to the <strong>Deploy</strong> Tab
