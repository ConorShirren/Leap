# Leap - Performance Analysis Engine

__Data Visualisation Application base on Strava APIs :fire:__

![project](/assets/project.png)


A Full Stack Web application built on Django Rest Framework and Angular which utilizes Stravas APIs to provide visualization of performance analysis in each activity recorded on your Strava Account. This projects uses the [Swagger API Playground](https://developers.strava.com/playground/) as backbone, which allows the user to obtain activity data on authentication
__WARNING__: The APIs used in this project does not allow the ability to create activities.

For more information on the Strava APIs available, see [Strava Developers Documentation](https://developers.strava.com/).

---

## :closed_book: Table of Contents

- [Requirements](#hammer_and_wrench-requirements)
- [Dataset](#open_file_folder-dataset)
- [Credits](#computer-credits)

---

## :hammer_and_wrench: Requirements

First of all you will need to make sure that you have Java JDK 11 installed, as it is
required by `torchserve` while deploying the model since it is exposing the APIs using Java.

```bash
sudo apt install --no-install-recommends -y openjdk-11-jre-headless
```

Then you can proceed with the installation of the PyTorch Python packages required for 
both training and serving the model. 

```bash
pip install torch torchvision -f https://download.pytorch.org/whl/torch_stable.html
pip install torchserve torch-model-archiver
```

If you have any problems regarding the PyTorch installation, visit 
[PyTorch - Get Started Locally](https://pytorch.org/get-started/locally/)

---

## :open_file_folder: Dataset

The dataset that is going to be used to train the image classification model is 
[Food101](https://www.tensorflow.org/datasets/catalog/food101), but not the complete version of it,
just a slice of 10 classes, which is more or less the 10% of the dataset.

This dataset consists of 101 food categories, with 101'000 images. For each class, 250 manually 
reviewed test images are provided as well as 750 training images. On purpose, the training images 
were not cleaned, and thus still contain some amount of noise. This comes mostly in the form of 
intense colors and sometimes wrong labels. All images were rescaled to have a maximum side length 
of 512 pixels.

![](https://raw.githubusercontent.com/alvarobartt/serving-pytorch-models/master/images/data.jpg)

---



## :computer: Credits
