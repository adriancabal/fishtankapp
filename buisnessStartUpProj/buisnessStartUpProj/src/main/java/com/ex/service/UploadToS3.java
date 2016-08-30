package com.ex.service;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.List;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.auth.AWSCredentials;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.auth.profile.ProfileCredentialsProvider;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.Bucket;
import com.amazonaws.services.s3.model.CreateBucketRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;

public class UploadToS3 {

	public static void main(String[] args) throws InterruptedException, IOException {
		//AWSCredentials credentials = new ProfileCredentialsProvider();
		AWSCredentials credentials = new ProfileCredentialsProvider().getCredentials();
		final AmazonS3Client amazonS3Client = new AmazonS3Client(credentials);
		
		long lengthOfFileToUpload;
		Bucket newBucket;
		File imageFile;
		final String bucketName = "fishtankbucket";
		final String key = "cat.jpg";
		
		
		//Retrieve Image from S3
		
//		System.out.println(amazonS3Client.getObject("fishtankbucket", "cat.jpg"));
//		S3Object s3obj = amazonS3Client.getObject("fishtankbucket", "cat.jpg");
//		System.out.println("objectcontent: " + s3obj.getKey());
		//s3obj.getObjectContent().getClass();
		
		//Reading the image file
		/*{	
			List<Bucket> bucketList = amazonS3Client.listBuckets();
			System.out.println("Buckets: ");
			for(Bucket b : bucketList){
				System.out.println(b.getName());
			}
			//newBucket = amazonS3Client.createBucket(new CreateBucketRequest(bucketName));
			//URL urlToFile = UploadToS3.class.getResource("/cat.jpg");
			// fullFilePath = urlToFile.getFile();
			imageFile = new File("cat.jpg");
			lengthOfFileToUpload = imageFile.length();
			
		}
		
		//Uploading the image file
		{
			
			PutObjectRequest putObjectRequest = new PutObjectRequest("fishtankbucket", key, imageFile);
			ObjectMetadata  objectMetadata = new ObjectMetadata();
			objectMetadata.setContentLength(lengthOfFileToUpload);
			putObjectRequest.withMetadata(objectMetadata);f
			amazonS3Client.putObject(putObjectRequest);
		}
		{
			
			URL url = amazonS3Client.generatePresignedUrl(bucketName,key, Date.from(Instant.now().plus(5, ChronoUnit.MINUTES)));
			System.out.println(url);
		}*/
		
		
		
	}

}
