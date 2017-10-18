# -*- mode: ruby -*-
# vi: set ft=ruby :

# All Vagrant configuration is done below. The "2" in Vagrant.configure
# configures the configuration version (we support older styles for
# backwards compatibility). Please don't change it unless you know what
# you're doing.
Vagrant.configure(2) do |config|
  config.vm.guest = :windows
  config.vm.communicator = "winrm"
  config.vm.boot_timeout = 600
  config.vm.graceful_halt_timeout = 600
  config.vm.box = "./spectrumreach.box"
  config.vm.box_url = "http://box.jl.monkapps.com/spectrumreach.box"
  config.vm.synced_folder ".", "/mediamonks"

  # Create a forwarded port mapping which allows access to a specific port
  # within the machine from a port on the host machine. In the example below,
  # accessing "localhost:8080" will access port 80 on the guest machine.
  # config.vm.network "forwarded_port", guest: 80, host: 80
  config.vm.network :forwarded_port, guest: 3389, host: 3389
  config.vm.network :forwarded_port, guest: 5985, host: 5985, id: "winrm", auto_correct: true
  # config.vm.network "private_network", ip: "192.168.33.2"

  config.hostsupdater.aliases = [
    "spectrumreach.dev"
  ]

  # config.vm.provider "virtualbox" do |vb|
  #    # Customize the name of VM in VirtualBox manager UI:
  #    vb.name = "yourcompany-yourbox"
  # end
end