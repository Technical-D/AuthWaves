from django.shortcuts import render, redirect
from django.http import HttpResponse
from UserAuth.forms import RegistrationForm, AccountAuthenticationForm
from django.contrib.auth import login, authenticate, logout
# Create your views here.
def home_view(request):
	
    return render(request, 'home.html')


def signup_view(request):
	user = request.user
	if user.is_authenticated: 
		return HttpResponse("You are already authenticated as " + str(user.email))

	context = {}
	if request.POST:
		form = RegistrationForm(request.POST)
		if form.is_valid():
			form.save()
			email = form.cleaned_data.get('email').lower()
			raw_password = form.cleaned_data.get('password1')
			account = authenticate(email=email, password=raw_password)
			login(request, account)
			return redirect('home')
		else:
			context['registration_form'] = form

	else:
		form = RegistrationForm()
		context['registration_form'] = form
	return render(request, 'signup/signup.html', context)


def logout_view(request):
	logout(request)
	return redirect("home")


def login_view(request):
	context = {}

	user = request.user
	if user.is_authenticated: 
		return redirect("home")


	if request.POST:
		form = AccountAuthenticationForm(request.POST)
		if form.is_valid():
			email = request.POST['email']
			password = request.POST['password']
			user = authenticate(email=email, password=password)

			if user:
				login(request, user)
				return redirect("home")

	else:
		form = AccountAuthenticationForm()

	context['login_form'] = form

	return render(request, "login/login.html", context)